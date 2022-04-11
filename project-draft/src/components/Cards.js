import React, { useState } from 'react';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// component for an individual card.
export function Card(props) {
    const name = props.card.name;
    const msg = props.card.msg;
    const trait = props.card.trait;
    const img = props.card.img;
    const author = props.card.author;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="card">
            <img class="card-img-top" src={img} alt="Post display" />
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p class="card-text">By: {author}</p>
                    <Button variant="outline-success" onClick={handleShow}>
                        Read More
                    </Button>
                </div>
            </div>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>{name}</Modal.Title>
                </Modal.Header>

                <img class="card-img-top" src={img} alt="Post choice" />
                <Modal.Body>They have displayed {trait}</Modal.Body>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

//component that renders the Cards

export function CardList(props) { //props is posts
    const [filter, setFilter] = useState();
    let data = [];
    try{
        data = Array.from(props.post);
    }
    catch{
        data = props;
    }

    const handleFilterClick = (e) => {
        let filterSelect =  e.currentTarget.name;
        console.log(filterSelect)
        if(filterSelect === "All"){
            setFilter();
        } else {
        setFilter(filterSelect);
        }
    };

    const displayFunc = () => {
        let cardList;
        if(filter !== undefined){
            data = _.filter(data, {trait: filter});
             cardList = data.map((postObj) => {
                return <Card card={postObj} key={postObj} />
            });
        } else {
            try{
                data = Array.from(props.post);
            }
            catch{
                data = props;
            }
            cardList = data.map((postObj) => {
                return <Card card={postObj} key={postObj} />
            });
        }
        return cardList
    }
    let display = displayFunc();


    return (
        <>
            <div class="container">
                <div class="filter">
                    <p>Filter-By:</p>
                    <button type="button" class="btn btn btn-outline-warning" name="All" onClick={handleFilterClick}>All</button>
                    <button type="button" class="btn btn btn-outline-warning" name="Integrity" onClick={handleFilterClick}>Integrity</button>
                    <button type="button" class="btn btn btn-outline-warning" name="Diversity" onClick={handleFilterClick}>Diversity</button>
                    <button type="button" class="btn btn btn-outline-warning" name="Excellence" onClick={handleFilterClick}>Excellence</button>
                    <button type="button" class="btn btn btn-outline-warning" name="collaboration" onClick={handleFilterClick}>Collaboration</button>
                    <button type="button" class="btn btn btn-outline-warning" name="Innovation" onClick={handleFilterClick}>Innovation</button>
                    <button type="button" class="btn btn btn-outline-warning" name="Respect" onClick={handleFilterClick}>Respect</button>
                    
                </div>
            </div>
            <div class="container">
                <div className="card-columns col-sm-12">
                    {display}
                </div>
            </div>

        </>
    );
}