import express from 'express';
import cors from 'cors';
import mockedOmsorgsperioder from './mocked-data/mockedOmsorgsperioder';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:8081',
    })
);

app.use('/mock/omsorgsperioder', (req, res) => {
    res.send({
        omsorgsperioder: mockedOmsorgsperioder,
        registrertSammeBosted: true,
        registrertForeldrerelasjon: true,
        tvingManuellVurdering: false,
    });
});

const port = 8082;
app.listen(port, () => {
    console.log('API-mock listening on port', port);
});
