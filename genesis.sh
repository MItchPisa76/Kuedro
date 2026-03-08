
apt update
apt install -y git
git clone 

REPO_DIR="kuedro"
REPO_URL="https://github.com/MItchPisa76/Kuedro.git"
  
cd "$REPO_DIR" || exit
  
if [ ! -d ".git" ]; then
    echo "Clonazione iniziale..."
	
    git clone "$REPO_URL"
	
else
    echo "Aggiornamento con salvataggio modifiche locali..."
      
    # 1. Mette da parte eventuali modifiche locali fatte per sbaglio
    git stash
    
    # 2. Scarica gli aggiornamenti dal server
    git pull
    
    # 3. (Opzionale) Riapplica le tue modifiche sopra il nuovo codice
    # git stash pop 
fi


nginx -g 'daemon off;'