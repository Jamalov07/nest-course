import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkphbWFsb3ZAZ21haWwuY29tIiwiaWQiOjksInJvbGVzIjpbeyJpZCI6MiwidmFsdWUiOiJBZG1pbiIsImRlc2NyaXB0aW9uIjoiQWRtaW5pc3RyYXRvciIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMjhUMDY6NDc6MTcuMTU0WiIsInVwZGF0ZWRBdCI6IjIwMjItMTEtMjhUMDY6NDc6MTcuMTU0WiIsIlVzZXJSb2xlcyI6eyJpZCI6NCwidXNlcklkIjo5LCJyb2xlSWQiOjJ9fV0sImlhdCI6MTY2OTczNjQ0OCwiZXhwIjoxNjY5ODIyODQ4fQ.nwZsy9ZDdxGZoarEyC_RM3zP4cVfxm-iVsyeINNfd5U',
    description: 'Token keladi hozircha',
  })
  token: string;
}
