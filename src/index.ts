import { app } from './app'

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
    
})