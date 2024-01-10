import { ApiProperty } from "@nestjs/swagger";

export class CreateSalaryDto {
    @ApiProperty({ required: true })
    amount: number;

}
