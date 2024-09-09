//
export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmedPassword, gender} = req.body; 
        
        //confirming password is equal to confirmed password
        if (password !== confirmedPassword){
            return res.status(400)
        }
    } catch (error) {
         
    }
}

export const login = (req, res) => {
    console.log("loginUser");
    res.send("login");
}
export const logout = (req, res) => {
    res.send("logout")
    console.log("logoutUser");
}
  