const ProfileCard = ({ name, age, location, followers, likes, photos }) => {
  return (
    <div style={styles.profileCard}>
      <div style={styles.profilePicture}></div>
      <h1 style={styles.h1}>{name} {age}</h1>
      <p style={styles.p}>{location}</p>
      <div style={styles.stats}>
        <p style={styles.statsP}>{followers} followers</p>
        <p style={styles.statsP}>{likes} likes</p>
        <p style={styles.statsP}>{photos} photos</p>
      </div>
    </div>
  );
};


const styles = {
  profileCard: {
    background: 'linear-gradient(to bottom, #00b5ad 50%, #fff 50%)',
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
    width: "300px",
    fontFamily: "Arial, sans-serif"
  },
  profilePicture: {
    backgroundImage: "url('https://via.placeholder.com/150')",
    backgroundSize: "cover",
    borderRadius: "50%",
    height: "150px",
    width: "150px",
    marginBottom: "20px"
  },
  h1: {
    fontSize: "24px",
    margin: "0",
    color: "black"
  },
  p: {
    fontSize: "18px",
    margin: "0",
    color: "black"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "20px",
    color: "black"
  },
  statsP: {
    fontSize: "16px",
    margin: "0",
    color: "black"

  }
};

export default ProfileCard;

