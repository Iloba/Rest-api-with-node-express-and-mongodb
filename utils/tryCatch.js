exports.tryCatch = (controller) => async (req, res, next) => {
    console.log(req.method);
    try {
        await controller(req, res);
    } catch (error) {
        return next(error);
    }
}



const myFunction = async () => {

}