/*
    User type
     - Email Address - Unique identifier
     - Password
 */

const users: Array<User> = [
    { email: 'sunilperera@gmail.com', password: 'sunil123' },
    { email: 'chanakabandara@gmail.com', password: 'chanaka123' },
    { email: 'sunethkumara@gmail.com', password: 'suneth123' },
    { email: 'chamalafernando@gmail.com', password: 'chamala123' },
    { email: 'kanthiperera@gmail.com', password: 'kanthi123' }
]

export default users;

interface User {
    email: string;
    password: string;
}
