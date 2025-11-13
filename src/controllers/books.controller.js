import { request, response } from "express";
import prisma from "../config/prisma.config.js";

export const getAllBooks = async (request, response) => {
    try {
        const books = await prisma.book.findMany();
        response.json({
            message: "All books",
            data: books
            })
    } catch (exception) {
        console.log(exception);
        response.status(500).json({
            message: "Something went wrong",
            error: exception.message
        })
    }
};

export const getBookById = async (request, response) => {
    try {
    const idFromUrl = request.params?.id;

    const book = await prisma.book.findUnique({
        where: {
            id:  Number (idFromUrl)
        }
    });

    if (!book) {
        response.status(404).json({
            message: 'not found'
        });
    };

    return response.status(200).json({
        message: 'succefull found book',
        data: book
    })
    } catch (exception) {
        response.status(500).json({
            message: 'something went wrong',
            error: exception.error
        })
    }
};

export const  createBook = async (request, response) => {
    try {
        const {title, description, thumbnail_url, release_year} = request.body;

        const newBook = await prisma.book.create({
            title,
            description,
            thumbnail_url,
            release_year
        })
    } catch (exception) {
        response.status(500).json({
            message: 'something went wrong',
            error: exception.error
        })
    }
};
export const  updateBook = async (request, response) => {
    try{
        const { id } = request.params;
        const {title, description, thumbnail_url, release_year} = request.body;
        const updateBook = await prisma.book.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description,
                thumbnail_url,
                release_year
            }
        });

        if (!updateBook) {
            response.status(404).json({
                message: 'not found'
            })
        }

    } catch(exception) {
        response.status(500).json({
            message: 'something went wrong',
            error: exception.error
        })
    }
};
export const  deleteBook = async (request, response) => {
    try {
    const bookId = request.params?.id;

    await prisma.book.delete({ 
        where: {
            id: Number(bookId)
        }
    })

    response.status(200).json({
        message: 'udalili udachno!'
    })
    } catch (exception) {
        response.status(500).json({
            message: 'something went wrong',
            error: exception.error
        })
    }
};