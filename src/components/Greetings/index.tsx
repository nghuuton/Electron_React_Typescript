import React from "react";
import { Button } from "../Button";
import { Container, Image, Text } from "./styles";

export function Greetings() {
    const [message, setMessage] = React.useState<string>();

    function handleSayHello() {
        window.Main.sendMessage("Hello World");
    }

    React.useEffect(() => {
        window.Main.on("message", (data: string) => {
            setMessage(data);
        });
    }, []);

    return (
        <Container>
            <Image src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="ReactJS logo" />
            <Text>An Electron boilerplate including TypeScript, React.</Text>
            <Text>{message}</Text>
            <Button onClick={() => handleSayHello()}>Send message to main process !</Button>
        </Container>
    );
}
