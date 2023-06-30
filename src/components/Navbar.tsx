import { Container, Image, Flex, Menu, Button, Avatar } from "@mantine/core";
import {FaAngleDown} from "react-icons/fa6";
import logo from "../assets/logo-no-background.png";

function Navbar(){
    return (
      <Flex h={64} align='center' justify='space-between' bg='primary.0'>
        {/* Logo container */}
        <Flex ml={24} p={12}>
            <Image maw={36} src={logo} alt='OneId logo'/>
        </Flex>

        {/* Menu Container */}
        <Flex align='center'>
            {/* Language selector */}
           <Container>
               <Menu>
                   <Menu.Target>
                       <Button color='primary' variant='white' rightIcon={<FaAngleDown />}>English</Button>
                   </Menu.Target>
                   <Menu.Dropdown>
                       <Menu.Label>Select language</Menu.Label>
                       <Menu.Item>English</Menu.Item>
                       <Menu.Item>Sinhala</Menu.Item>
                       <Menu.Item>Tamil</Menu.Item>
                   </Menu.Dropdown>
               </Menu>
           </Container>
            {/* Sign in button */}
            <Container>
                <Menu>
                    <Menu.Target>
                       <Avatar radius='xl'>MI</Avatar>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Mohamed Izzath</Menu.Label>
                        <Menu.Item>User account page</Menu.Item>
                        <Menu.Item>Settings</Menu.Item>
                        <Menu.Item>Sign out</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Container>
        </Flex>
      </Flex>
    );
}

export default Navbar;