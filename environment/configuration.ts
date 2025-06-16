export class Config {
    constructor(
        public CrmUrl: string = "",
        public ImageUrl: string = "",
        public StudentUrl: string = "",
        public httpUrl: string = "",
        public siteKey: string = "",
        public LoginUrl: string = "",
        public StripePublicKey:string="",
        public SiteUrl:string="",
        public ProductId:number=0
    ) { }
}
