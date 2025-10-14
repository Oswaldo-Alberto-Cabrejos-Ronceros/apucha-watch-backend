import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HealthCondition } from 'src/health-condition/entities/health-condition.entity';
import { HealthRecommendation } from 'src/health-recommendation/entities/health-recommendation.entity';

@Entity({ name: 'health_condition_recommendations' })
export class HealthConditionRecommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => HealthCondition,
    (healthCondition) => healthCondition.healthConditionRecommendations,
  )
  @JoinColumn({ name: 'health_condition_id' })
  healthCondition: HealthCondition;

  @ManyToOne(
    () => HealthRecommendation,
    (healthRecommendation) =>
      healthRecommendation.healthConditionRecommendations,
  )
  @JoinColumn({ name: 'health_recommendation_id' })
  healthRecommendation: HealthRecommendation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
