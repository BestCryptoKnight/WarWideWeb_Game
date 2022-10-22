import { makeStyles } from "@material-ui/core/styles";
import logo1 from "../assets/img/logo1.png";
import logo2 from "../assets/img/logo2.png";
import label1 from "../assets/img/label1.png";
import label2 from "../assets/img/label2.png";

const useStyles = makeStyles({
  root: {
    borderRadius: 12,
    backgroundColor: "blue",
  },
  regForm: {
    minWidth: "500px",
  },
  regTitle: {},

  conBtn: {
    width: "90%",
    marginLeft: "5%",
  },
  span: {
    width: "80%",
    marginLeft: "10%",
    height: "10px",
  },
  dashboard: {
    background: "linear-gradient(290deg, #1B1251,#390A7C, #E33B86)",
    position: "fixed",
  },
  // logopan: {
  //   // marginLeft: "10%",
  //   // marginTop: "10%",
  //   // // height: "600px",
  // },
  logo1pan: {
    width: "45%",
    height: "500px",
    backgroundImage: `url(${logo1})`,
    backgroundSize: "100% 100%",
    minWidth: "350px",
  },
  logo2pan: {
    width: "30%",
    height: "500px",
    backgroundImage: `url(${logo2})`,
    backgroundSize: "100% 100%",
    minWidth: "300px",
  },
  log_label1: {
    position: "absolute",
    width: "15%",
    height: "100px",
    backgroundImage: `url(${label1})`,
    backgroundSize: "100% 100%",
    minWidth: "200px",
    marginTop: "100px",
  },
  log_label2: {
    position: "absolute",
    width: "45%",
    height: "150px",
    backgroundImage: `url(${label2})`,
    backgroundSize: "100% 100%",
    minWidth: "350px",
    marginTop: "200px",
  },
});

export default function Dashboard() {
  // const [sockets, setSocketes] = React.useState();
  // React.useEffect(() => setSocketes(socket),[socket])
  // socket.on("message",data => console.log(data.userId));
  // console.log(socket);

  const classes = useStyles();
  return (
    <div
      className={classes.dashboard}
      style={{ height: "100%", width: "100%", overflowY: "auto" }}
    >
      <div
        className="md-6 sm-12"
        style={{ marginLeft: "5%", marginTop: "10%", height:'50%', display:'flex' }}
      >
        <div className={classes.logo1pan} />
        <div className={classes.log_label1}></div>
        <div className={classes.log_label2}></div>

        <span style={{ marginLeft: "10%" }}></span>
        <div className={classes.logo2pan} />
      </div>
      {/* <CreateRoomComponent userName="a" roomName="a1" socket={socket} />
      <CreateRoomComponent userName="b" roomName="b1" socket={socket} /> */}
    </div>
  );
}
