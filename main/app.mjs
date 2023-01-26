import express from 'express';
import exphbs from 'express-handlebars';
import homeRoutes from './routes/homeRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs';


const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', homeRoutes);
app.use('/admin', adminRoutes);




app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}));

app.set('view engine', 'hbs');


//GET 404 Page
 app.get('*', (req, res) => {
     res.render('404');
 })


 //LISTENING PORT
app.listen(process.env.PORT || 1000 )