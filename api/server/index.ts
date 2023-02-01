import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
//Instantiate a new PrismaClient instance
const prisma = new PrismaClient()

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//---------------------------------------------------------------------//

app.post('/img/add', async (req: Request, res: Response) => {
    console.log(req.body);
    const { description,url } = req.body;
    

    // Validate input
    if (!description || !url) {
        return res.status(400).json({ error: 'Both description and url are required' });
    }

    try {
        // Create user
        const image = await prisma.image.create({
            data: {
                description,
                url
            }
        });

        res.json(image);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: (error as any).message });
    }
});
//---------------------------------------------------------------------//
// app.post('/', async (req: Request, res: Response) => {
//     const { username, password } = req.body;

//     // Validate input
//     if (!username || !password) {
//         return res.status(400).json({ error: 'Both username and password are required' });
//     }

//     try {
//         // Create user
//         const user = await prisma.user.create({
//             data: {
//                 username,
//                 password
//             }
//         });

//         res.json(user);
//     } catch (error) {
//         // Handle errors
//         res.status(500).json({ error: (error as any).message });
//     }
// });

//---------------------------------------------------------------------//
app.get('/img/all', async (req: Request, res: Response) => {
    try {
        const allImges = await prisma.image.findMany()
        res.json(allImges);
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while fetching all users')
    }
});

//---------------------------------------------------------------------//
//this one should improve
//to get one user //now it is good with findUnique
// app.get('/one/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const user = await prisma.user.findUnique({ where: { id: Number(id) } });
//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
// });
//---------------------------------------------------------------------//

app.put('/img/update/:id', async (req: Request, res: Response) => {
    console.log("*********")
    console.log(req.params)
    console.log(req.body)
    const { id } = req.params
    try {
        const { newDescription } = req.body
        console.log("-----")
        console.log(newDescription)
        const Image = await prisma.image.update({
            where: { id: Number(id) },
            data: {description: newDescription },
        })
        res.json({ message: 'image description updated successfully', Image });
    } catch (error) {
        console.error(error)
        res.status(500).send(`An error occurred while updating Image with id ${id}`)
    }
})

//---------------------------------------------------------------------//

// app.delete('/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const user = await prisma.user.delete({
//             where: {
//                 id: Number(id),
//             },
//         });
//         res.json({ message: 'User deleted successfully', user });
//     } catch (error) {
//         res.status(500).json({ error: (error as any).message });
//     }
// });

//---------------------------------------------------------------------//
// app.post('/car/many', async (req: Request, res: Response) => {
//     const { cars } = req.body;
//     try {
//         // Validate input
//         if (!Array.isArray(cars) || cars.length === 0) {
//             return res.status(400).json({ error: 'Invalid input, expected an array of cars' });
//         }
//         // Create car
//         const createdCars = await prisma.car.createMany({ data: cars });
//         // Return created users
//         console.log(createdCars)
//         res.json(createdCars);
//     } catch (error) {
//         res.status(500).json({ error: (error as any).message });
//     }
// });
//---------------------------------------------------------------------//

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
