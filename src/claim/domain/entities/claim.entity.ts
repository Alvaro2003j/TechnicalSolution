import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { ClaimRegistered } from '../events/claim-registered.event';
import { ClaimId } from '../value-object/claim-id.value'
import { ClaimType } from '../value-object/claimtype.value';

export class Claim extends AggregateRoot {
  private id: ClaimId;
  private Cost: number;
  private Claim_Type: ClaimType;
  private TimeClaim: number;
  private Active: boolean;

  public constructor(Cost: number, Claim_Type: ClaimType, TimeClaim: number, Active: boolean)
  {
    super();
    this.Cost = Cost;
    this.Claim_Type = Claim_Type;
    this.TimeClaim = TimeClaim;
    this.Active = Active;
  }

  public Register() {
    const event = new ClaimRegistered(this.id.getValue(), this.Claim_Type.getNamePlan(), this.Cost);
    this.apply(event);
  }

  //Getter and Setter Cost
  public getId(): number
  {
    return this.id.getValue();
  }

  public setId(value: ClaimId)
  {
    this.id = value;
  }
  //Getter and Setter Cost
  public getCost(): number
  {
    return this.Cost;
  }

  public setCost(value: number)
  {
    this.Cost = value;
  }

  //Getter and Setter Claim
  public getClaim_Type(): ClaimType
  {
    return this.Claim_Type;
  }

  public setClaim_Type(value: ClaimType)
  {
    this.Claim_Type = value;
  }

  //Getter and Setter TimeClaim
  public getTimeClaim(): number
  {
    return this.TimeClaim;
  }

  public setTimeClaim(value: number)
  {
    this.TimeClaim = value;
  }

  //Getter and Setter Active
  public getActive(): boolean
  {
    return this.Active;
  }

  public setActive(value: boolean)
  {
    this.Active = value;
  }
}