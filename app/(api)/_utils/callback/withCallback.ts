import callbacks from '@app/_utils/callbacks';

export default function WithCallback(func: (..._: any) => any) {
  return async (...args: any) => {
    const res = await func(...args);
    callbacks.onUpdate();
    return res;
  };
}
