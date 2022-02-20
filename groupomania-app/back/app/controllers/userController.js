exports.userBoard = (req, res) => {
    res.status(200).json({message:"Contenu Utilisateur"});
  };
exports.adminBoard = (req, res) => {
    res.status(200).json({message:"Contenu Administrateur"});
  };
exports.moderatorBoard = (req, res) => {
    res.status(200).json({message:"Contenu Modérateur"});
};

