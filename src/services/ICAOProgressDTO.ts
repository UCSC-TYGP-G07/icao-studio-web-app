interface ICAOProgressDTO{
    all_passed: boolean;
    tests: {
        geometry: TestDTO,
        blurring: TestDTO,
        varied_bg: TestDTO,
        eyes_closed: TestDTO,
        hair_across_eyes: TestDTO,
        illumination_intensity: TestDTO,
        looking_away: TestDTO,
        mouth_open: TestDTO,
        redeye: TestDTO,
        shadows_across_face: TestDTO
    }
}

interface TestDTO{
    is_passed: boolean;
    time_elapsed: number;
}

export default ICAOProgressDTO;