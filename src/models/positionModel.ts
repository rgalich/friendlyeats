export class PositionModel {
  public id!: number;

  public positionX!: 'left' | 'right' | null;

  public positionY!: 'top' | 'bottom' | null;

  public value!: 'o' | 'x' | null;
}
