import { app } from './app';
const port = app.get('port');

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
