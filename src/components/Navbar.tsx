import { Container, Image, Flex, Menu, Button, Avatar } from "@mantine/core";
import {FaAngleDown, FaCircleUser} from "react-icons/fa6";
import logo from "../assets/logo-no-background.png";
import Cookies from "universal-cookie";
import React, {createContext, useContext, useEffect} from "react";
import {AuthContext, JwtToken} from "../services/AuthContextProvider";
import jwtDecode from "jwt-decode";
import {useLocation, useNavigate} from "react-router-dom";
import {RiSettings5Fill} from "react-icons/ri";

function Navbar(props: NavbarProps){
    /* Getting currently signed in user */
    const cookie = new Cookies();
    const accessToken = cookie.get('Access-Token');

    const navigator = useNavigate();
    const location = useLocation();

    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if(user == null){
            /* Fetching the user from JWT */
            if (accessToken == undefined || accessToken == null) {
                /* Redirect to the signin page */

                if(location.pathname !== '/signin' && location.pathname !== '/') {
                    if(props.protectedRoute === true) {
                        navigator('/signin');
                    }
                }
            } else {
                /* Decode the access token and store in react context */
                const token = jwtDecode<JwtToken>(accessToken);
                const email = token.email.toString();

                if (email == null || email == undefined) {
                    /* Redirect to the signin page */
                    if(location.pathname !== '/signin' && location.pathname !== '/') {
                        navigator('/signin');
                    }
                }

                setUser({email: email, roles: []});
            }
        }
    }, []);

    /* Sign out from the current user */
    function signoutHandler(){
        cookie.remove('Access-Token');
        setUser(null);
        window.location.reload();
    }

    return (
      <Flex h={64} align='center' justify='space-between' bg='primary.0'>
        {/* Logo container */}
        <Flex ml={24} p={12}>
            <Image maw={36} src={logo} alt='OneId logo' onClick={() => navigator('/')}/>
        </Flex>

        {/* Menu Container */}
        <Flex align='center'>
            {/* Language selector */}
           <Container>
               <Button color='primary' variant='filled' mr={12} onClick={() => navigator('/appointment')}>Create Appointment</Button>
               { user && <Button color='primary' variant='white' rightIcon={<RiSettings5Fill />} onClick={() => navigator('/dashboard')}>Dashboard</Button> }
           </Container>
            {/* Sign in button */}
            { user &&
            <Container>
                <Menu>
                    <Menu.Target>
                       <Avatar radius='xl'>{user.email.slice(0,2).toUpperCase()}</Avatar>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>{user.email}</Menu.Label>
                        <Menu.Item onClick={signoutHandler}>Sign out</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Container>}
            { !user && <Button variant='filled' color='primary' mx={6} onClick={() => navigator('/signin')}>Sign in&nbsp;<FaCircleUser/></Button>}
        </Flex>
      </Flex>
    );
}

interface NavbarProps{
    protectedRoute: boolean;
}

export default Navbar;