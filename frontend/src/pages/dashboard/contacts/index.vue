<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Users, UserPlus, Search, Check, X, Clock } from '@lucide/vue'
import { ContactsApi } from 'src/api/contacts'
import { IConnection, IRecordUser } from 'src/types'
import { EnumConnectionStatus, EnumLoadingState } from 'src/enums'

// ─── Connections ──────────────────────────────────────────────────────────────

const connections = ref<IConnection[]>( [] )
const connectionsLoadingState = ref( EnumLoadingState.INITIAL )

const acceptedConnections = computed( () =>
  connections.value.filter( c => c.status === EnumConnectionStatus.ACCEPTED )
)

const pendingReceived = computed( () =>
  connections.value.filter( c => c.status === EnumConnectionStatus.PENDING )
)

async function loadConnections() {
  connectionsLoadingState.value = EnumLoadingState.LOADING
  try {
    connections.value = await ContactsApi.getConnections()
    connectionsLoadingState.value = EnumLoadingState.LOADED
  } catch {
    connectionsLoadingState.value = EnumLoadingState.ERROR
  }
}

async function respond( connectionId: string, accept: boolean ) {
  await ContactsApi.respondToRequest( connectionId, accept )
  await loadConnections()
}

// ─── Search ───────────────────────────────────────────────────────────────────

const searchQuery = ref( '' )
const searchResults = ref<IRecordUser[]>( [] )
const searchLoadingState = ref( EnumLoadingState.INITIAL )
const requestedIds = ref<Set<string>>( new Set() )

let searchTimeout: ReturnType<typeof setTimeout> | null = null

function onSearchInput() {
  if ( searchTimeout ) clearTimeout( searchTimeout )
  if ( !searchQuery.value.trim() ) {
    searchResults.value = []
    searchLoadingState.value = EnumLoadingState.INITIAL
    return
  }
  searchTimeout = setTimeout( () => runSearch(), 400 )
}

async function runSearch() {
  searchLoadingState.value = EnumLoadingState.LOADING
  try {
    searchResults.value = await ContactsApi.searchUsers( searchQuery.value )
    searchLoadingState.value = EnumLoadingState.LOADED
  } catch {
    searchLoadingState.value = EnumLoadingState.ERROR
  }
}

async function sendRequest( user: IRecordUser ) {
  await ContactsApi.sendRequest( user.id )
  requestedIds.value.add( user.id )
}

function getInitials( name: string ) {
  return name
    .split( ' ' )
    .slice( 0, 2 )
    .map( w => w.charAt( 0 ).toUpperCase() )
    .join( '' )
}

// ─── Init ─────────────────────────────────────────────────────────────────────

loadConnections()
</script>

<template>
  <q-page-container>
    <q-page class="page">
      <div class="page-wrapper">

        <!-- Header -->
        <div class="page-header">
          <div class="page-header__icon">
            <Users />
          </div>
          <div>
            <h1 class="page-title q-mb-none">Your Circle</h1>
            <p class="page-subtitle q-mb-none">
              Connect with people you trust to start sharing items.
            </p>
          </div>
        </div>

        <!-- Pending requests -->
        <template v-if="pendingReceived.length > 0">
          <div class="section-label">
            <Clock size="15" class="q-mr-xs" />
            Pending requests
          </div>
          <div class="card-list">
            <div
              v-for="conn in pendingReceived"
              :key="conn.id"
              class="person-card"
            >
              <q-avatar color="primary" size="40px" text-color="white">
                {{ conn.requesterId.charAt( 0 ).toUpperCase() }}
              </q-avatar>
              <div class="person-card__info">
                <p class="person-name q-mb-none">{{ conn.requesterId }}</p>
                <p class="person-meta q-mb-none">Wants to connect</p>
              </div>
              <div class="person-card__actions">
                <q-btn
                  round
                  unelevated
                  color="positive"
                  size="sm"
                  @click="respond( conn.id, true )"
                >
                  <Check size="16" />
                </q-btn>
                <q-btn
                  round
                  unelevated
                  color="negative"
                  size="sm"
                  class="q-ml-sm"
                  @click="respond( conn.id, false )"
                >
                  <X size="16" />
                </q-btn>
              </div>
            </div>
          </div>
        </template>

        <!-- Find people -->
        <div class="section-label">
          <UserPlus size="15" class="q-mr-xs" />
          Find people
        </div>
        <q-input
          v-model="searchQuery"
          outlined
          dense
          placeholder="Search by name or email..."
          class="search-input"
          @update:model-value="onSearchInput"
        >
          <template #prepend>
            <Search size="16" color="gray" />
          </template>
        </q-input>

        <div v-if="searchLoadingState === EnumLoadingState.LOADING" class="state-row">
          <q-spinner color="primary" size="24px" />
        </div>

        <div
          v-else-if="searchLoadingState === EnumLoadingState.LOADED && searchResults.length === 0"
          class="state-row text-grey-6"
        >
          No users found for "{{ searchQuery }}"
        </div>

        <div v-else-if="searchResults.length > 0" class="card-list q-mt-sm">
          <div
            v-for="user in searchResults"
            :key="user.id"
            class="person-card"
          >
            <q-avatar color="secondary" size="40px" text-color="white">
              <template v-if="user.avatarUrl">
                <img :src="user.avatarUrl" />
              </template>
              <template v-else>
                {{ getInitials( user.displayName ) }}
              </template>
            </q-avatar>
            <div class="person-card__info">
              <p class="person-name q-mb-none">{{ user.displayName }}</p>
              <p class="person-meta q-mb-none">{{ user.email }}</p>
            </div>
            <q-btn
              unelevated
              no-caps
              size="sm"
              :color="requestedIds.has( user.id ) ? 'grey-4' : 'primary'"
              :text-color="requestedIds.has( user.id ) ? 'grey-7' : 'white'"
              :disable="requestedIds.has( user.id )"
              class="connect-btn"
              @click="sendRequest( user )"
            >
              {{ requestedIds.has( user.id ) ? 'Requested' : 'Connect' }}
            </q-btn>
          </div>
        </div>

        <!-- Connections list -->
        <div class="section-label q-mt-lg">
          <Users size="15" class="q-mr-xs" />
          Connected ({{ acceptedConnections.length }})
        </div>

        <div v-if="connectionsLoadingState === EnumLoadingState.LOADING" class="state-row">
          <q-spinner color="primary" size="24px" />
        </div>

        <div v-else-if="acceptedConnections.length === 0" class="empty-state">
          <Users size="40" class="empty-state__icon" />
          <p class="empty-state__title">No connections yet</p>
          <p class="empty-state__body">
            Search for friends or neighbors above to start building your circle.
            Once connected, you can see and borrow each other's items.
          </p>
        </div>

        <div v-else class="card-list">
          <div
            v-for="conn in acceptedConnections"
            :key="conn.id"
            class="person-card"
          >
            <q-avatar color="primary" size="40px" text-color="white">
              {{ conn.addresseeId.charAt( 0 ).toUpperCase() }}
            </q-avatar>
            <div class="person-card__info">
              <p class="person-name q-mb-none">{{ conn.addresseeId }}</p>
              <p class="person-meta q-mb-none">Connected</p>
            </div>
          </div>
        </div>

      </div>
    </q-page>
  </q-page-container>
</template>

<style lang="sass" scoped>
.page
  background: #F7F8FA
  min-height: 100vh

.page-wrapper
  max-width: 640px
  margin: 0 auto
  padding: 40px 24px

.page-header
  display: flex
  align-items: center
  gap: 16px
  margin-bottom: 32px

.page-header__icon
  display: flex
  align-items: center
  justify-content: center
  width: 48px
  height: 48px
  border-radius: 14px
  background: linear-gradient(#34C992, #159B6E)
  color: white
  flex-shrink: 0

.page-title
  font-size: 22px
  font-weight: 700
  color: #111

.page-subtitle
  font-size: 14px
  color: #888
  margin-top: 2px

.section-label
  display: flex
  align-items: center
  font-size: 12px
  font-weight: 600
  text-transform: uppercase
  letter-spacing: 0.05em
  color: #888
  margin-bottom: 10px

.search-input
  background: white
  border-radius: 10px

.card-list
  display: flex
  flex-direction: column
  gap: 10px
  margin-bottom: 24px

.person-card
  display: flex
  align-items: center
  gap: 14px
  background: white
  border-radius: 12px
  padding: 14px 16px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06)

.person-card__info
  flex: 1

.person-name
  font-size: 14px
  font-weight: 600
  color: #111

.person-meta
  font-size: 12px
  color: #888
  margin-top: 2px

.person-card__actions
  display: flex

.connect-btn
  border-radius: 8px
  min-width: 88px

.state-row
  display: flex
  justify-content: center
  padding: 24px 0
  font-size: 14px

.empty-state
  display: flex
  flex-direction: column
  align-items: center
  padding: 48px 24px
  text-align: center
  background: white
  border-radius: 16px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06)

.empty-state__icon
  color: #CCC
  margin-bottom: 16px

.empty-state__title
  font-size: 16px
  font-weight: 600
  color: #333
  margin-bottom: 8px

.empty-state__body
  font-size: 14px
  color: #888
  max-width: 340px
  line-height: 1.6
</style>