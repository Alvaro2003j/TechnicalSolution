import { Claim } from "../domain/entities/claim.entity";

export enum OfferType
{
    Monthly,
    Season,
    Holiday,
    LimitedTime,
    Undefined

}
  export class AvailableOffer 
{
    public name: string;
    public type: OfferType;

    constructor(name: string, type: OfferType)
    {
        this.name = name;
        this.type = type;
    }
}

export class OfferContainer
{
    public offers: Array<AvailableOffer>;
    protected containerName: string;

    constructor(name: string)
    {
        this.containerName = name;
        this.offers = new Array<AvailableOffer>();
    }

    public putAway(offer: AvailableOffer)
    {
        this.offers.push(offer);
    }

    public printItems()
    {
        if(this.offers.length > 0)
        {
            console.log("Promos in " + this.containerName + ": ");
            for(let offer of this.offers)
            {
                console.log("\t" + offer.name);
            }
        }
        else
        {
            console.log(this.containerName + " is empty!");
        }
    }
}

export class ContainerSorter
{
    protected sortType: OfferType;
    protected next: ContainerSorter;
    protected container: OfferContainer;

    constructor(container: OfferContainer, sortType: OfferType)
    {
        this.container = container;
        this.sortType = sortType;
    }

    public setNext(sorter: ContainerSorter)
    {
        this.next = sorter;
    }

    public handle(offer: AvailableOffer)
    {
        if(offer.type === this.sortType)
        {
            this.container.putAway(offer);
        }
        else if(this.next != null)
        {
            this.next.handle(offer);
        }
    }

    public printChain()
    {
        this.container.printItems();
        if(this.next != null)
        {
            this.next.printChain();
        }
    }
}

export class NullSorter extends ContainerSorter
{
    constructor(container: OfferContainer)
    {
        super(container, OfferType.Undefined);
    }

    public handle(offer: AvailableOffer )
    {
        this.container.putAway(offer);
    }
}

export class Solution
{
    public static execute(): void
    {
        const monthlyContainer = new OfferContainer("Monthly Offer Container");
        const seasonContainer = new OfferContainer("Season Offer Container");
        const holidayContainer = new OfferContainer("Holiday Offer Container");
        const limitedTimeContainer = new OfferContainer("Limited Time! Offer Container");
        const undefined = new OfferContainer("Undefined");

        const monthly = new ContainerSorter(monthlyContainer, OfferType.Monthly);
        const season = new ContainerSorter(seasonContainer, OfferType.Season);
        const holiday = new ContainerSorter(holidayContainer, OfferType.Holiday);
        const limitedTime = new ContainerSorter(limitedTimeContainer, OfferType.LimitedTime);

        const other = new NullSorter(undefined);

        monthly.setNext(season);
        season.setNext(holiday);
        holiday.setNext(limitedTime);
        limitedTime.setNext(other);

        const sortingMachine = monthly;
        sortingMachine.handle(new AvailableOffer ("10% OFF in second technical service (valid one month)", OfferType.Monthly));
        sortingMachine.handle(new AvailableOffer ("Christmas Special Offer!", OfferType.Holiday));
        sortingMachine.handle(new AvailableOffer ("15% OFF for referring (valid one month)", OfferType.Monthly));
        sortingMachine.handle(new AvailableOffer ("Special Summer Offer", OfferType.Season));
        sortingMachine.handle(new AvailableOffer ("Black Friday Offer", OfferType.LimitedTime));
        sortingMachine.handle(new AvailableOffer ("", OfferType.Undefined));

        sortingMachine.printChain();
    }
}
Solution.execute();