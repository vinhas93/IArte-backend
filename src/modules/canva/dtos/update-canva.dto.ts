import { PartialType } from '@nestjs/mapped-types';
import { CanvaEntity } from '../entity/canva.entity';

export class UpdateCanvaDto extends PartialType(CanvaEntity) {}
