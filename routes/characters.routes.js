const router = require("express").Router();
const axios = require("axios");
const charactersApiHandler = require('../services/characters-api.service');
const { response } = require("express");

//LISTA DE LOS PERSONAJES
router.get("/", (req, res, next) => {
    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render("characters/list-characters", { characters: response.data }))
        .catch(err => next(err))
});


//DETALLE DE LOS PERSONAJES
router.get("/detalles/:id", (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render("characters/details-character", { character: response.data }))
        .catch(err => next(err))
});

//CREAR PERSONAJES
router.get("/crear", (req, res, next) => {
    res.render("characters/create-character")
});

router.post("/crear", (req, res, next) => {

    const { name, weapon, occupation } = req.body
    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/detalles/${response.data.id}`))
        .catch(err => next(err))
});

module.exports = router;

//EDITAR PERSONAJE
router.get("/editar/:id", (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render("characters/edit-character", { character: response.data }))
        .catch(err => next(err))
})

router.post("/editar/:id", (req, res, next) => {
    const { id } = req.params
    const { name, weapon, occupation } = req.body
    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/detalles/${response.data.id}`))
        .catch(err => next(err))

})

router.post("/delete/:id", (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))

})


// https://ih-crud-api.herokuapp.com/characters