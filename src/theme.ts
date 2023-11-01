import { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
    colors: {
        'primary': ['#ECEAFB', '#CAC3F4', '#A89CEC', '#8676E5', '#644FDE', '#4229D6', '#3521AB', '#281881', '#1B1056', '#0D082B'],
        'secondary': ['#FFF3E5', '#FFDDB8', '#FFC78A', '#FFB25C', '#FF9C2E', '#FF8600', '#CC6B00', '#995000', '#663600', '#331B00'],
        'grey': ['#EFF1F5', '#D4D7E3', '#B8BDD1', '#9CA3BF', '#8089AD', '#646F9B', '#50597C', '#3C435D', '#282C3E', '#14161F'],
        'success': ['#E9FBF3', '#C3F4DD', '#9CEDC7', '#75E6B1', '#4FDE9C', '#28D786', '#20AC6B', '#188150', '#105636', '#082B1B'],
        'error': ['#FCE8E8', '#F8BFBF', '#F39696', '#EE6D6D', '#E94444', '#E41B1B', '#B71515', '#891010', '#5B0B0B', '#2E0505']
    },
    fontFamily: 'Poppins, sans-serif',
    headings: { fontFamily: 'Inter, sans-serif'},
    breakpoints: { xs: '30em', sm: '48em', md: '64em', lg: '74em', xl: '90em' },
}

export default theme;