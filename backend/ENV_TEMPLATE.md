# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/bharatview
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## For MongoDB Atlas (Cloud):

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bharatview?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## For Local MongoDB:

```env
MONGO_URI=mongodb://localhost:27017/bharatview
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important:** 
- Replace `your_super_secret_jwt_key_change_this_in_production` with a strong random string
- Never commit the `.env` file to version control
- The `.env` file should already be in `.gitignore`
