import {Request, Response} from 'express';

import * as apiRequest from '../API/bookmark/bookmark_api'

exports.getBookmark = (req:Request, res:Response) => {
    apiRequest.getBookmark(req, res)
}
exports.addBookmark = (req:Request, res:Response) => {
    apiRequest.addBookmark(req, res)
}
exports.updateBookmark = (req:Request, res:Response) => {
    apiRequest.updateBookmark(req, res)
}
exports.deleteBookmark = (req:Request, res:Response) => {
    apiRequest.deleteBookmark(req, res)
}