import logoImg from "../../assets/medcloud.svg";
import {
  CssBaseline,
  Box,
  Button,
  AppBar,
  List,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Drawer,
  Divider,
  ListItem,
  ListItemText
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from "react";
import { usePatientsData } from "../../hooks/usePatientsData";
import { RegisterPatients } from "../../components/RegisterPatients";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#fff",
  },
  logo: {
    height: "30px",
    marginLeft: theme.spacing(2),
  },
  appBar: {
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.05)",
    position: "relative",
    backgroundColor: "#fff",
  },
  drawer: {
    width: "27vw",
  },
  drawerPaper: {
    width: "27vw",
  },
  toolbar: theme.mixins.toolbar,
  buttonList: {
    height: "10vh",
    paddingRight: "10vw",
  },
  inline: {
    fontWeight: "bold",
    paddingRight: "20vw",
  },
  inlineSub: {
    fontWeight: "500",
    paddingRight: "20vw",
  },
  grow: {
    flexGrow: 1,
  },
  marginBottomElement: {
    marginBottom: theme.spacing(5),
  },
  marginBottomElementSmall: {
    marginBottom: theme.spacing(2),
  },
  fieldText: {
    width: "25vw",
  },
  positionMain: {
    position: "relative",
  },
  icon: {
    marginRight: theme.spacing(2),
  },

  buttonRegister: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    height: "2.5rem",
    width: "90%",
  },
  fontBold: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: theme.spacing(4),
    textTransform: "uppercase",
  },
  deleteButton:{
    backgroundColor: '#f44336',
    contrastText: 'fff'
  },
}));

export function Home() {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  const patient = usePatientsData();
  const [viewPatient, setViewPatient] = useState("");

  function handleViewPatient(text) {
    setViewPatient({
      id: text.id,
      nome: text.nome,
      hospital: text.hospital,
      descricao: text.descricao,
      createdAt: text.createdAt,
    });
  }

  async function handleDelete(patientId) {
    window.alert("Você tem certeza que deseja deletar esse registro?");
    await fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: patientId,
      }),
    }).then(function (res) {
      return res.json();
    });
  }

  return (
    <main className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <img src={logoImg} className={classes.logo} />
          </IconButton>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar></Toolbar>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon/>}
          className={classes.buttonRegister}
          onClick={(e) => setVisible(true)}
        >
          Registrar paciente
        </Button>
        <List component="nav">
          {patient.map((text, index) => {
            return (
              <>
                <ListItem
                  onClick={(e) => {
                    setVisible(false);
                    handleViewPatient(text);
                  }}
                  button
                  key={text.id}
                  className={classes.buttonList}
                >
                  <AccountCircle
                    style={{ fontSize: 40 }}
                    color="primary"
                    className={classes.icon}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        color="primary"
                        noWrap
                        className={classes.inline}
                      >
                        {text.nome}
                      </Typography>
                    }
                    secondary={
                      <Typography noWrap className={classes.inlineSub}>
                        {text.hospital}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Drawer>
      <Box component="div" ml="26rem" mt="6vh" position="relative">
        {visible ? (
          <RegisterPatients />
        ) : (
          <>
            <Typography className={classes.marginBottomElementSmall} ><b>Nome:</b> {viewPatient.nome}</Typography>
            <Typography className={classes.marginBottomElementSmall}><b>Hospital:</b> {viewPatient.hospital}</Typography>
            <Typography className={classes.marginBottomElementSmall}><b>Descrição:</b> {viewPatient.descricao}</Typography>
            <Typography className={classes.marginBottomElementSmall}><b>Número de registro:</b>: {viewPatient.id}</Typography>
            <Typography className={classes.marginBottomElement}><b>Registrado em:</b> {viewPatient.createdAt}</Typography>
            <Button color="secondary" variant="contained" startIcon={<DeleteIcon />} onClick={(e) => handleDelete(viewPatient.id)}>delete</Button>
          </>
        )}
      </Box>
    </main>
  );
}
