import {Box, Button, Container, Flex, Image, Text, TextInput, Title} from "@mantine/core";
import Navbar from "../components/Navbar";
import Bottombar from "../components/Bottombar";
import React, {useContext} from "react";
import {useViewportSize} from "@mantine/hooks";
import {FaArrowRight, FaCircleUser, FaSquareArrowUpRight} from "react-icons/fa6";
import IndexImage from '../assets/images/index-page/Studio photographer-amico.png';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../services/AuthContextProvider";

function Index(){
    /* Getting current viewport sizes */
    const {width, height} = useViewportSize();

    const navigate = useNavigate();

    /* Getting current logged user */
    const { user, setUser } = useContext(AuthContext);

    return (
        <>
            <Navbar />
            <Flex direction='row' align='center' justify='center' w={width - 48} h={height - 96} py='auto' mx={24}>
                <Image src={IndexImage} fit='contain' height={(height - 96) * 0.8}/>
                <Container>
                    <Title pb={12} order={1} color='primary.8'>ICAO Studio Web App</Title>
                    <Text pb={24}>Instant checking of photographs adhering to internationally recognized ICAO (International Civil Aviation Organization) standards. </Text>
                    <Flex direction='row' align='center' justify='start'>
                        <Button variant='light' color='primary' mx={6}>Learn ICAO&nbsp;<FaSquareArrowUpRight/></Button>
                        { !user && <Button variant='filled' color='primary' mx={6} onClick={() => navigate('/signin')}>Sign in&nbsp;<FaCircleUser/></Button> }
                        { user && <>
                            <Button variant='filled' color='primary' mx={6} onClick={() => navigate('/reference')}>Choose image&nbsp;<FaArrowRight/></Button>
                            </>
                        }
                    </Flex>
                </Container>
            </Flex>
            <Bottombar />
        </>

    );
}

export default Index;