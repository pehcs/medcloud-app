import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import { TextField, Typography, TextareaAutosize, Button, makeStyles } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  marginBottomElement: {
    marginBottom: theme.spacing(5),
  },
  fieldText: {
    width: '25vw',
  },
  fontBold:{
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: theme.spacing(4),
    textTransform: 'uppercase',
  },
  buttonRegister: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    height: "2.5rem",
    width: "90%",
  },
}));

export function RegisterPatients() {
  const classes = useStyles()

  const [nome, setNome] = useState("");
  const [hospital, setHospital] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleCreateNewPatient(event){
    event.preventDefault()
    await fetch('/add',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        hospital: hospital,
        descricao: descricao
      })
    }).then(function(res){
      setNome("")
      setHospital("")
      setDescricao("")
      return res.json(); }) 
  }

  return (
    <form onSubmit={handleCreateNewPatient} className={classes.fieldText}>
      <Typography className={classes.fontBold} h5>
        Registro de pacientes
      </Typography>
      <div>
        <TextField
          fullWidth
          variant="outlined"
          id="outlined-basic"
          name="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className={classes.marginBottomElement}
          label="Nome completo"
        />
        <TextField
          variant="outlined"
          fullWidth
          id="outlined-basic"
          name="hospital"
          value={hospital}
          onChange={(event) => setHospital(event.target.value)}
          className={classes.marginBottomElement}
          label="Hospital"
        />
      </div>
      <div>
        <TextareaAutosize
          value={descricao}
          name="descricao"
          onChange={(event) => setDescricao(event.target.value)}
          placeholder="Descrição"
          rows="10"
          cols="46"
          className={classes.marginBottomElement}
        />
      </div>
      <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<AddIcon/>}
          className={classes.buttonRegister}
        >
          Confirmar
        </Button>
    </form>
  );
}
