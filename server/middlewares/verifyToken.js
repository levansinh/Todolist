import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token
  if(token){
    const accessToken = token.split(" ")[1]
    jwt.verify(accessToken, process.env.JSONWEBTOKEN_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json("token khong fdung");
      }
        req.userId = user._id;
        next();
    });
  }
};
const verifyTokenWithAdmin = (req, res, next) => {
  verifyToken((req,res) => {
    if(req.user.isAdmin === true) {
      next()
    }else{
      res.status(403).json({message:"You had Logined"})
    }
  })
};

const checkToken = (req,res,next) => {
  const token = req.cookies.accessToken
  if(token) {
    next()
  }else{
    res.status(403).json({message:"You had Logined"})
  }
}

export { verifyToken, verifyTokenWithAdmin,checkToken };

