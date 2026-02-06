import { Notify, QNotifyAction, QNotifyCreateOptions } from 'quasar'

export interface IDisplayMessageFn {
  (
    title: string,
    message: string | null,
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | undefined,
    color?: string | undefined,
    confirm?: ( () => void ) | null,
    cancel?: ( () => void ) | null,
    timeout?: number,
  ): unknown
}

export const displayMessage: IDisplayMessageFn = function (
  title,
  message,
  position = 'center',
  color = 'info',
  confirm,
  cancel,
  timeout = 0,
) {
  const config: QNotifyCreateOptions = {
    timeout,
    message: title,
    color,
    position,
    multiLine: false,
    html: true,
    actions: [],
  }

  if ( message ) {
    config.multiLine = true
    config.message = `<b class="text-body1 q-mb-md">${ title }</b><p class="q-pt-md">${ message }</p>`
  }

  if ( confirm ) {
    ( config.actions as QNotifyAction[] ).push( { label: 'Ok', color: 'yellow', handler: confirm } )
  }

  if ( cancel ) {
    ( config.actions as QNotifyAction[] ).push( { label: 'Nein', color: 'yellow', handler: cancel } )
  }

  if ( ! confirm && ! cancel ) {
    config.timeout = 10000
  }

  return Notify.create( config )
}
