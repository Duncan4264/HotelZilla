import Hotel from '../../Models/hotel';
import fs from "fs";
export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);

        if(files.image) {
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }

        hotel.save((err, result) => {
            if(err) {
                console.log('Saving Hotel error: ', err)
                res.status(400).send('Error Saving Hotel')
            }
            res.json(result);
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message,
        });
    }
}