import {rem, Stepper} from "@mantine/core";
import ICAOProgressDTO from "../services/ICAOProgressDTO";
import {useEffect, useState} from "react";
import {FaXmark} from "react-icons/fa6";

function ICAOProgressCard(prop: ICAOProgressCardProp){
    const [validTests, setValidTests] = useState<TestResults[]>();
    const [invalidTests, setInvalidTests] = useState<TestResults[]>();

    useEffect(() => {

    }, [prop.icaoProgress]);


    useEffect(() => {
        const tests = Object.keys(prop.icaoProgress.tests);
        let valid_tests: TestResults[] = [];
        let invalid_tests: TestResults[] = [];

        if(prop.icaoProgress.tests.geometry.is_passed === true){
            valid_tests.push({ title: 'Geometry Tests', is_passed: true, time_elapsed: prop.icaoProgress.tests.geometry.time_elapsed});
        } else {
            invalid_tests.push({ title: 'Geometry Tests', is_passed: false, time_elapsed: prop.icaoProgress.tests.geometry.time_elapsed});
        }

        if(prop.icaoProgress.tests.blurring.is_passed === true){
            valid_tests.push({ title: 'Blurring Tests', is_passed: true, time_elapsed: prop.icaoProgress.tests.blurring.time_elapsed});
        } else {
            invalid_tests.push({ title: 'Blurring Tests', is_passed: false, time_elapsed: prop.icaoProgress.tests.blurring.time_elapsed});
        }

        if(prop.icaoProgress.tests.varied_bg.is_passed === true){
            valid_tests.push({ title: 'Background Tests', is_passed: true, time_elapsed: prop.icaoProgress.tests.varied_bg.time_elapsed});
        } else {
            invalid_tests.push({ title: 'Background Tests', is_passed: false, time_elapsed: prop.icaoProgress.tests.varied_bg.time_elapsed});
        }

        setValidTests(valid_tests);
        setInvalidTests(invalid_tests);
    }, [prop.icaoProgress])

    return <Stepper active={validTests ? validTests.length: 0} color='teal'>
        {
            validTests && validTests.map(validTest => <Stepper.Step label={validTest.title} />)
        }
        {
            invalidTests && invalidTests.map(validTest => <Stepper.Step label={validTest.title} color='red' icon={<FaXmark style={{ color:'#F02F18', width: rem(20), height: rem(20) }}/>} />)
        }
    </Stepper>
}

export default ICAOProgressCard;

export interface ICAOProgressCardProp{
    icaoProgress: ICAOProgressDTO
}

interface TestResults{
    title: string;
    is_passed: boolean;
    time_elapsed: number;
}