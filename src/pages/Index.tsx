import {Box, Button, Container, Flex, Image, Text, Title} from "@mantine/core";
import Navbar from "../components/Navbar";
import Bottombar from "../components/Bottombar";
import React from "react";
import {useViewportSize} from "@mantine/hooks";
import {FaArrowRight, FaCircleUser, FaSquareArrowUpRight} from "react-icons/fa6";
import IndexImage from '../assets/images/index-page/Studio photographer-amico.png';

function Index(){
    /* Getting current viewport sizes */
    const {width, height} = useViewportSize();

    return (
        <>
            <Navbar />
            <Flex direction='row' align='center' justify='center' w={width - 48} h={height - 96} py='auto' mx={24}>
                <Image src={IndexImage} fit='contain' height={(height - 96) * 0.8}/>
                <Container>
                    <Title pb={12} order={1} color='primary.8'>ICAO Studio Web App</Title>
                    <Text pb={24}>Instant checking of photographs adhering to internationally recognized ICAO (International Civil Aviation Organization) standards. </Text>
                    <Container fluid pl={0}>
                        <Button variant='light' color='primary' mx={6}>Learn ICAO&nbsp;<FaSquareArrowUpRight/></Button>
                        <Button variant='filled' color='primary' mx={6}>Sign in&nbsp;<FaCircleUser/></Button>
                    </Container>
                </Container>
            </Flex>
            <Bottombar />
        </>

    );
}

export default Index;