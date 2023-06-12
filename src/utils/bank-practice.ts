type Accounts = Array<{ name: string; money: number }>;
export class Bank {
  public accounts: Accounts;
  constructor() {
    this.accounts = [];
  }
  openAccount(name: string) {
    if (this.accounts.some(account => account.name.includes(name))) {
      return '用戶已經開戶過！';
    }
    this.accounts.push({ name, money: 0 });
    return `開戶完成`;
  }
  deposit(name: string, money: number) {
    const account = this.accounts.find(item => item.name === name);
    if (!account) {
      return '目前沒有此用戶';
    }
    account.money += money;
    return `用戶餘額 ${account.money} 元`;
  }
  withdraw(name: string, money: number) {
    const account = this.accounts.find(item => item.name === name);
    if (!account) {
      return '目前沒有此用戶';
    }
    if (account.money >= money) {
      account.money -= money;
      return `用戶餘額 ${account.money} 元`;
    } else {
      return `用戶餘額不足，餘額 ${account.money} 元`;
    }
  }
}
