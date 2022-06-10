import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { Money } from '../../../common/domain/value-objects/money.value';
import { SuscriptionRegistered } from '../events/suscription-registered.event';
import { SuscriptionId } from '../value-object/suscription-id.value'
import { SuscriptionType } from '../value-object/suscriptiontype.value';
export class Suscription extends AggregateRoot {
  private id: SuscriptionId;
  private Cost: Money;
  private readonly Suscription_Type: SuscriptionType;
  private TimeSuscription: number;
  private Active: boolean;

  public constructor(Cost: Money, Suscription_Type: SuscriptionType, TimeSuscription: number, Active: boolean)
  {
    super();
    this.Cost = Cost;
    this.Suscription_Type = Suscription_Type;
    this.TimeSuscription = TimeSuscription;
    this.Active = Active;
  }

  public Register() {
    const event = new SuscriptionRegistered(this.id.getValue(), this.Suscription_Type.getNamePlan(), this.Cost.getAmount());
    this.apply(event);
  }

  //Getter and Setter Cost
  public getId()
  {
    return this.id;
  }

  public setId(value: SuscriptionId)
  {
    this.id = value;
  }
  //Getter and Setter Cost
  public getCost()
  {
    return this.Cost;
  }

  public setCost(value: Money)
  {
    this.Cost = value;
  }

  //Getter and Setter Suscription_Type
  public getSuscription_Type()
  {
    return this.Suscription_Type;
  }

  public setSuscription_Type(value: SuscriptionType)
  {
    this.Suscription_Type = value;
  }

  //Getter and Setter TimeSuscription
  public getTimeSuscription()
  {
    return this.TimeSuscription;
  }

  public setTimeSuscription(value: number)
  {
    this.TimeSuscription = value;
  }

  //Getter and Setter Active
  public getActive()
  {
    return this.Active;
  }

  public setActive(value: boolean)
  {
    this.Active = value;
  }
}