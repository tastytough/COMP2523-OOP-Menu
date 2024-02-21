export default interface IWritable {
    write(menuStr: string): Promise<void>;
}