
import React, { useState, useEffect, ReactNode } from 'react';
import { Button, Modal } from "react-bootstrap";

type DictionaryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    word: string;
};

type Definition = {
    definition: string;
    example?: string;
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
};

type Phonetic = {
    text?: string;
    audio?: string;
};

type DictionaryApiResponse = {
    meanings: Meaning[];
    phonetics: Phonetic[];
};

function DictionaryModal({ isOpen, onClose, word }: DictionaryModalProps) {
    const [definitions, setDefinitions] = useState<ReactNode[]>([]);
    const [audioURL, setAudioURL] = useState<string>('');
    const [audioText, setAudioText] = useState<string>('UK /rɪ\'pɔː(r)t/');
    const [errorMessage, setErrorMessage] = useState<ReactNode>('');
    const [showDefination, setShowDefination] = useState<boolean>(false);


    useEffect(() => {
        if (isOpen) {
            setAudioURL('');
            setAudioText('');
            setDefinitions([]);
            setErrorMessage('');
            handleWordClick(word);
        }
    }, [isOpen, word]);

    const handleWordClick = (inputWord: string) => {
        const sanitizedWord = inputWord.replace(/[^\w\s]/gi, '');
        const encodedWord = encodeURIComponent(sanitizedWord);
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodedWord}`;

        setShowDefination(false);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to retrieve data');
                }
                return response.json();
            })
            .then((data: DictionaryApiResponse[]) => {
                const entry = data[0];

                const allDefinitions = entry.meanings.map((meaning, meaningIdx) => {
                    const partOfSpeech = meaning.partOfSpeech;

                    const definitionItems = meaning.definitions.map((definition, defIdx) => (
                        <div className="row" key={defIdx}>
                            <div className="col-md-6">{definition.definition}</div>
                            <div className="col-md-6">{definition.example || ''}</div>
                        </div>
                    ));

                    return (
                        <div className="row" key={meaningIdx}>
                            <div className="col-md-12">
                                <h5>{partOfSpeech}</h5>
                            </div>
                            {definitionItems}
                        </div>
                    );
                });

                const phonetic = entry.phonetics.find(ph => ph.audio !== '') || {};
                setAudioText(phonetic.text || '');
                setAudioURL(phonetic.audio || '');
                setDefinitions(allDefinitions);
                setShowDefination(true);
            })
            .catch(() => {
                setErrorMessage(
                    <div className="alert alert-danger">
                        Unable to retrieve definitions for "{sanitizedWord}". Please try again.
                    </div>
                );
            });
    };

    return (
        <Modal show={isOpen} onHide={onClose} size="xl" className="score-modal">
            <Modal.Header closeButton>
                <Modal.Title>{word}</Modal.Title>
            </Modal.Header>

            {!showDefination ? (
                <Modal.Body>
                    Not Available!
                </Modal.Body>
            ) : (
                <Modal.Body>
                    <div>
                        <div className="d-block w-100">
                            <div className="d-flex justify-content-md-between w-100">
                                <div><span className="audio1">{audioText}</span></div>
                                <div>
                                    {audioURL && (
                                        <audio id="audio1" controls src={audioURL} autoPlay />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="definitions" style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                        {definitions}
                        {errorMessage}
                    </div>
                </Modal.Body>
            )}

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DictionaryModal;
