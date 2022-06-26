export class RegisterRequestResponse {
    constructor(
        public id: number,
        public message: string,
        public date: string,
        public technicalId: number
    )
    {}
}