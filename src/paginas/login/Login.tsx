import './Login.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import useLocalStorage from 'react-use-localstorage';

function Login() {
/* 
a maior partes dos hooks precisarão de uma variavel para acessar uma função para modificar os seus dados.

1- criaremos o hook do tipo UserLogin, definindo os seus valores iniciais.

2- 

3-

4-

5- Finalizaremos o metodo onSubmit, fazendo a comunicação

6- por fim utilizaremos o hook useEffect, que vai verrificar o token e redirecionar para a pagina 

*/
let navigate = useNavigate();
const [token, setToken] = useLocalStorage ('token')

/* UserLogin para acessar dados, e setUserLogin para guardar e modificar os dados */
/* useState serve para identificar a função de cada um, UserLogin e setUserLogin*/

const [userLogin, setUserLogin] = useState<UserLogin>({
    /* aqui é o hook */
    id: 0,
    usuario: '',
    senha: '',
    token: '',
})

/* função para atualizar a classe hook */
/* e:, para recuperar as informações que o usuario digitar através do ChangeEvent*/
function updateModel(e: ChangeEvent<HTMLInputElement>){
    setUserLogin({
        ...userLogin,
        [e.target.name]: e.target.value /* para o sistema saber onde guardar no hook todos os valores digitados pelo usuario, ex: [e.target.name] - é o local no textfield name='usuario que vai ser linkado ao do nome do usuario no hook e vai salvar no hook, e.target.value - que vai salvar no hook os dados que o usuario digitou */

    })
}

useEffect(()=>{ /* serve para confirmar se os dados digitados estão corretos e retornar-los */
    if(token != ''){
        navigate('/home')
    }
}, [token])

async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault() /* e.preventDefault(), serve para não carregar a pagina. 
    Ex: quando vc está na pagina de cadastro e preenche todo o formulario mas quando vc envia o email está incorreto, consequentemente a pagina carrega e vc perde todos os dados */

    try{

        await login('/usuarios/logar', userLogin, setToken);

        alert('Usuario Logado com Sucesso!')

    }catch(error){

        alert('Dados incorretos!')

    }
}

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>

                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />

                        {/* OBS: value={UserLogin.usuario} vai estar linkado com o hook  */}
                        {/* OBS: onChange={(e: ChangeEvent<HTMLInputElement>)} para recuperar os dados */} 

                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password'fullWidth />

                        <Box marginTop={2} textAlign='center'>
                            
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                            
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>

                            <Link to='/cadastrar' className='text-decorator-none'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                            </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    );
}

export default Login;