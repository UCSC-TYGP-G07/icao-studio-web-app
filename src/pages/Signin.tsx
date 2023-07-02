import { TextInput, Title, Text, Button, Center, Flex } from "@mantine/core";
import Navbar from "../components/Navbar";
import {Link, useNavigate} from "react-router-dom";
import Bottombar from "../components/Bottombar";
import {useViewportSize} from "@mantine/hooks";

function Signin(){
    const navigate = useNavigate();
    const { width, height } = useViewportSize();

    return (
        <>
            <Navbar />
            {/* Main container which contains Sign in page */}
            <Flex direction='column' align='center' justify='center' w={width * 0.4} h={height - 96} py='auto' mx='auto' >
                <Title order={1} align='center' my={16}>Sign in to your account</Title>
                <TextInput w={320} my={12} mx='auto' label='Email address' type='email' placeholder='sunilperera@gmail.com' />
                <TextInput w={320} my={12} mx='auto' label='Password' type='password'/>
                <Text size={14} ml='auto' align='right' w='full'>
                    <Link to='/'>Forgot Password?</Link>
                </Text>
                <Text size={14} align='center'>No account?<Link to='/'>Register now</Link></Text>
                <Center my={12}>
                    <Button variant='filled' color='primary' onClick={() => {navigate('/reference')}}>Sign in</Button>
                </Center>
            </Flex>
            <Bottombar />
        </>
    );
}

export default Signin;