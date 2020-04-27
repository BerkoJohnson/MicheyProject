import { Action } from '@ngrx/store';

export const GET_NEW_BANANA = 'Get New Banana';
export const PEEL_BANANA = 'Peel Banana';

export class GetNewBanana implements Action {
  readonly type: string = GET_NEW_BANANA;
  constructor(public payload: any) {
    console.log('ACTION ' + GET_NEW_BANANA);
  }
}

export class PeelBanana implements Action {
  readonly type: string = PEEL_BANANA;
  constructor(public payload: any) {
    console.log('ACTION ' + PEEL_BANANA);
  }
}

export type BananaAction = GetNewBanana | PeelBanana;
