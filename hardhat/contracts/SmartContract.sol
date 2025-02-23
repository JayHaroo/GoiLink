// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract GoiLinkAgreement {
    struct Agreement {
        address person1;
        address person2;
        string title;
        string description;
        string agreementType;
        bool isSignedByPerson1;
        bool isSignedByPerson2;
        bool isCompleted;
    }

    mapping(uint256 => Agreement) public agreements;
    uint256 public agreementCount;

    event AgreementCreated(uint256 agreementId, address indexed person1, address indexed person2, string title, string agreementType);
    event AgreementSigned(uint256 agreementId, address indexed signer);
    event AgreementCompleted(uint256 agreementId);

    function createAgreement(
        address _person1,
        address _person2,
        string memory _title,
        string memory _description,
        string memory _agreementType
    ) public returns (uint256) {
        agreementCount++;
        agreements[agreementCount] = Agreement({
            person1: _person1,
            person2: _person2,
            title: _title,
            description: _description,
            agreementType: _agreementType,
            isSignedByPerson1: false,
            isSignedByPerson2: false,
            isCompleted: false
        });

        emit AgreementCreated(agreementCount, _person1, _person2, _title, _agreementType);
        return agreementCount;
    }

    function signAgreement(uint256 _agreementId) public {
        Agreement storage agreement = agreements[_agreementId];

        require(msg.sender == agreement.person1 || msg.sender == agreement.person2, "Not authorized to sign");
        require(!agreement.isCompleted, "Agreement is already completed");

        if (msg.sender == agreement.person1) {
            require(!agreement.isSignedByPerson1, "Already signed by person1");
            agreement.isSignedByPerson1 = true;
        } else if (msg.sender == agreement.person2) {
            require(!agreement.isSignedByPerson2, "Already signed by person2");
            agreement.isSignedByPerson2 = true;
        }

        emit AgreementSigned(_agreementId, msg.sender);

        if (agreement.isSignedByPerson1 && agreement.isSignedByPerson2) {
            agreement.isCompleted = true;
            emit AgreementCompleted(_agreementId);
        }
    }

    function getAgreement(uint256 _agreementId) public view returns (
        address, address, string memory, string memory, string memory, bool, bool, bool
    ) {
        Agreement memory agreement = agreements[_agreementId];
        return (
            agreement.person1,
            agreement.person2,
            agreement.title,
            agreement.description,
            agreement.agreementType,
            agreement.isSignedByPerson1,
            agreement.isSignedByPerson2,
            agreement.isCompleted
        );
    }
}
