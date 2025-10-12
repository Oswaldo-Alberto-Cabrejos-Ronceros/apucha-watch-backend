import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HealthConditionRecommendation } from 'src/health-condition-recommendation/entities/health-condition-recommendation.entity';

@Entity({ name: 'health_conditions' })
export class HealthCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => HealthConditionRecommendation,
    (healthConditionRecommendation) => healthConditionRecommendation.healthCondition,
  )
  healthConditionRecommendations: HealthConditionRecommendation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
