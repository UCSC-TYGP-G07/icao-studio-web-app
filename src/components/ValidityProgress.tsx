import {Avatar, Center, Container, Flex, ScrollArea, Stepper, Text, Timeline, TimelineItem} from "@mantine/core";
import {useState} from "react";

function ValidityProgress({ progress }: ProgressProps){
    const [active, setActive] = useState(1);

    return (
        <ScrollArea mx='auto' my={28} w='full'>
            <Stepper color='success' active={active} onStepClick={setActive} orientation='vertical'>
                {progress.map((item, index) => (
                    <Stepper.Step key={index + 1} my={8} label={`Step ${index + 1}`} description={item.text} />
                ))}
            </Stepper>
        </ScrollArea>
    )
}


export interface ProgressItemProps{
    index: number;
    status: ProgressStatus;
    text: string;
}

export interface ProgressProps{
    progress: Array<ProgressItemProps>;
}

export enum ProgressStatus{
    success = 'success',
    error = 'error'
}

export default ValidityProgress;