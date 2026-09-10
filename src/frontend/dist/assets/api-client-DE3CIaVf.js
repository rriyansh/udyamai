var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { J as Subscribable, K as pendingThenable, M as resolveEnabled, N as shallowEqualObjects, O as resolveStaleTime, Q as noop, V as environmentManager, Y as isValidTimeout, Z as timeUntilStale, _ as timeoutManager, $ as focusManager, a0 as fetchState, a1 as replaceData, a2 as notifyManager, r as reactExports, a3 as shouldThrowError, a4 as useQueryClient, a5 as useInternetIdentity, a6 as createActorWithConfig, a7 as Variant, a8 as Text, a9 as Null, aa as Record, ab as Vec, ac as Nat, ad as Opt, ae as Bool, af as Float64, ag as Int, ah as Service, ai as Func, aj as Principal, ak as Nat8, al as HttpAgent, am as Actor } from "./index-CeuI7PIL.js";
import { g as generateDemoAnalysis } from "./analysis-engine-DtVfTxoQ.js";
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actor = await createActorWithConfig(createActor2, {
        agentOptions: { identity }
      });
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const Error$1 = Variant({
  "FrontendOriginsNotConfigured": Null,
  "MixedSsoSources": Record({
    "otherKeys": Vec(Text),
    "ssoKeys": Vec(Text)
  }),
  "Stale": Record({ "ageNs": Nat }),
  "MalformedCandid": Null,
  "AmbiguousAttribute": Record({
    "field": Text,
    "sources": Vec(Text)
  }),
  "NoAttributes": Null,
  "UnknownNonce": Null,
  "UntrustedSsoSource": Record({ "domain": Text }),
  "MissingField": Text,
  "FrontendOriginMismatch": Record({
    "got": Text,
    "expected": Vec(Text)
  })
});
const Result__1 = Variant({ "ok": Null, "err": Error$1 });
const UserRole = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const ChatMessage = Record({
  "content": Text,
  "role": Variant({ "user": Null, "assistant": Null })
});
const ChatRequest = Record({
  "history": Vec(ChatMessage),
  "analysisId": Nat,
  "message": Text
});
const ChatResponse = Record({ "reply": Text });
const Provenance = Variant({
  "Estimated": Null,
  "UserProvided": Null,
  "Calculated": Null,
  "Observed": Null
});
const Confidence = Variant({
  "Low": Null,
  "High": Null,
  "Medium": Null
});
const Estimate = Record({
  "provenance": Provenance,
  "value": Nat,
  "confidence": Confidence
});
const RepaymentRow = Record({
  "emi": Nat,
  "month": Nat,
  "principal": Nat,
  "interest": Nat,
  "closingBalance": Nat,
  "openingBalance": Nat
});
const PrincipalInterest = Record({
  "totalRepayment": Nat,
  "totalInterest": Nat,
  "totalPrincipal": Nat
});
const Amortization = Record({
  "emi": Estimate,
  "totalRepayment": Estimate,
  "totalInterest": Estimate,
  "schedule": Vec(RepaymentRow),
  "principalInterest": PrincipalInterest
});
const BreakEven = Record({
  "explanation": Text,
  "breakEvenSales": Estimate,
  "breakEvenUnits": Opt(Estimate),
  "assumptions": Vec(Text)
});
const CashRequirement = Record({
  "total": Estimate,
  "projectCost": Estimate,
  "buffer": Estimate,
  "workingCapital": Estimate
});
const OperatingCosts = Record({
  "rawMaterial": Nat,
  "salary": Nat,
  "other": Nat,
  "marketing": Nat,
  "rent": Nat,
  "transport": Nat,
  "electricity": Nat,
  "maintenance": Nat,
  "packaging": Nat
});
const WorkingCapitalInput = Record({
  "initialRequirement": Nat,
  "monthlyRequirement": Nat,
  "emergencyBufferPercent": Nat
});
const FinanceInput = Record({
  "operatingCosts": OperatingCosts,
  "moratoriumMonths": Nat,
  "pricePerUnit": Nat,
  "loanRequirement": Nat,
  "ownCapital": Nat,
  "tenureMonths": Nat,
  "proposedProjectCost": Nat,
  "variableCostPerUnit": Nat,
  "interestRatePercent": Nat,
  "marginPercent": Nat,
  "workingCapital": WorkingCapitalInput
});
const SchemeRule = Record({
  "maxProjectCost": Nat,
  "moratoriumMonths": Nat,
  "name": Text,
  "loanPercent": Nat,
  "tenureMonths": Nat,
  "beneficiaryContributionPercent": Nat,
  "interestRatePercent": Nat,
  "minProjectCost": Nat
});
const Moratorium = Record({
  "moratoriumMonths": Nat,
  "explanation": Text,
  "repaymentStartMonth": Nat,
  "interestAccruedDuringMoratorium": Estimate
});
const Financing = Record({
  "loanAmount": Estimate,
  "scheme": SchemeRule,
  "feasibleProjectCost": Estimate,
  "beneficiaryContribution": Estimate,
  "maximumLoan": Estimate
});
const WorkingCapital = Record({
  "initialRequirement": Estimate,
  "emergencyBuffer": Estimate,
  "totalRequirement": Estimate,
  "monthlyRequirement": Estimate
});
const FinancialPlan = Record({
  "moratorium": Moratorium,
  "breakEven": BreakEven,
  "financing": Financing,
  "workingCapital": WorkingCapital,
  "cashRequirement": CashRequirement,
  "monthlyOperatingCost": Estimate,
  "amortization": Amortization
});
const Value = Variant({
  "int": Int,
  "nat": Nat,
  "float": Float64,
  "bool": Bool,
  "null": Null,
  "text": Text
});
const Cell = Record({ "value": Value, "name": Text });
const Result = Record({
  "hasMore": Bool,
  "rows": Vec(Vec(Cell))
});
const Competitor = Record({
  "id": Nat,
  "lat": Float64,
  "lng": Float64,
  "name": Text,
  "distanceKm": Float64,
  "priceRangeAvg": Nat,
  "priceRangeMax": Nat,
  "priceRangeMin": Nat
});
const MapData = Record({
  "businessClusters": Vec(Text),
  "underservedZones": Vec(Text),
  "userLocation": Record({ "lat": Float64, "lng": Float64 }),
  "reliableDataAvailable": Bool,
  "competitors": Vec(Competitor),
  "averageDistance": Float64,
  "nearestCompetitors": Vec(Competitor),
  "competitorDensity": Float64
});
const ScoreCard = Record({
  "explanation": Text,
  "reasoning": Text,
  "score": Nat
});
const Scores = Record({
  "supplyGap": ScoreCard,
  "demand": ScoreCard,
  "competition": ScoreCard,
  "opportunity": ScoreCard
});
const RiskLevel = Variant({
  "Low": Null,
  "High": Null,
  "Medium": Null
});
const RiskCategory = Record({
  "why": Text,
  "whatToDo": Text,
  "level": RiskLevel,
  "category": Text
});
const RiskAssessment = Record({
  "categories": Vec(RiskCategory)
});
const SWOT = Record({
  "weaknesses": Vec(Text),
  "strengths": Vec(Text),
  "threats": Vec(Text),
  "opportunities": Vec(Text)
});
const Pricing = Record({
  "packagingCost": Estimate,
  "recommendedPriceRange": Record({ "max": Nat, "min": Nat }),
  "productionCost": Estimate,
  "transportCost": Estimate,
  "competitorPriceRange": Record({
    "avg": Nat,
    "max": Nat,
    "min": Nat
  }),
  "operatingCost": Estimate,
  "estimatedMargin": Estimate
});
const MarketReach = Record({
  "demandIndicators": Vec(Text),
  "potentialCustomerBase": Estimate,
  "competitionLevel": Text,
  "nearbyMarkets": Vec(Text),
  "estimatedReach": Estimate,
  "supplyIndicators": Vec(Text),
  "underservedOpportunities": Vec(Text),
  "distributionChannels": Vec(Text),
  "accessibility": Text
});
const AnalysisResult = Record({
  "map": MapData,
  "scores": Scores,
  "risk": RiskAssessment,
  "swot": SWOT,
  "pricing": Pricing,
  "market": MarketReach
});
const Radius$1 = Variant({ "R5km": Null, "R10km": Null });
const AnalysisInput = Record({
  "district": Text,
  "state": Text,
  "village": Text,
  "capital": Nat,
  "category": Text,
  "block": Text
});
const Analysis = Record({
  "id": Nat,
  "result": AnalysisResult,
  "createdAt": Int,
  "radius": Radius$1,
  "input": AnalysisInput
});
const SchemeStatus = Variant({
  "UnderReview": Null,
  "Inactive": Null,
  "Active": Null
});
const ProjectCostRange = Record({
  "max": Nat,
  "min": Nat
});
const Timestamp = Int;
const Scheme = Record({
  "id": Nat,
  "status": SchemeStatus,
  "documents": Vec(Text),
  "moratoriumMonths": Opt(Nat),
  "projectCostRange": ProjectCostRange,
  "beneficiaryType": Text,
  "marginRequirement": Opt(Nat),
  "name": Text,
  "eligibility": Text,
  "tenureMonths": Opt(Nat),
  "loanPercentage": Opt(Nat),
  "interestRate": Opt(Float64),
  "lastVerifiedDate": Timestamp,
  "officialSource": Text
});
const SchemeRoutingInput = Record({
  "projectCost": Nat,
  "businessCategory": Text,
  "beneficiaryCategory": Text,
  "contribution": Nat,
  "location": Text
});
const SchemeMatch = Record({
  "moratoriumMonths": Opt(Nat),
  "requiredDocuments": Vec(Text),
  "scheme": Scheme,
  "loan": Opt(Nat),
  "officialVerificationNote": Text,
  "tenureMonths": Opt(Nat),
  "interestRate": Opt(Float64),
  "projectCostLimit": ProjectCostRange,
  "contribution": Opt(Nat),
  "whyMayFit": Text
});
const SchemeRoutingResult = Record({
  "heading": Text,
  "matches": Vec(SchemeMatch)
});
Service({
  "_initialize_access_control": Func([], [], []),
  "_internet_identity_sign_in_finish": Func([], [Result__1], []),
  "_internet_identity_sign_in_start": Func([], [Vec(Nat8)], []),
  "assignCallerUserRole": Func([Principal, UserRole], [], []),
  "chat": Func([ChatRequest], [ChatResponse], []),
  "computeAmortization": Func(
    [Nat, Nat, Nat, Nat],
    [Amortization],
    ["query"]
  ),
  "computeBreakEven": Func(
    [Nat, Nat, Nat],
    [BreakEven],
    ["query"]
  ),
  "computeCashRequirement": Func(
    [Nat, Nat, Nat],
    [CashRequirement],
    ["query"]
  ),
  "computeFinancialPlan": Func(
    [FinanceInput, SchemeRule],
    [FinancialPlan],
    ["query"]
  ),
  "computeFinancing": Func(
    [FinanceInput, SchemeRule],
    [Financing],
    ["query"]
  ),
  "computeMoratorium": Func(
    [Nat, Nat, Nat],
    [Moratorium],
    ["query"]
  ),
  "computeWorkingCapital": Func(
    [WorkingCapitalInput],
    [WorkingCapital],
    ["query"]
  ),
  "execute": Func([Text], [Result], ["query"]),
  "getAnalysis": Func([Nat], [Opt(Analysis)], ["query"]),
  "getApiDoc": Func([], [Text], ["query"]),
  "getCallerUserRole": Func([], [UserRole], ["query"]),
  "getScheme": Func([Nat], [Opt(Scheme)], ["query"]),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "listAnalyses": Func([], [Vec(Analysis)], ["query"]),
  "listSchemes": Func([], [Vec(Scheme)], ["query"]),
  "routeSchemes": Func(
    [SchemeRoutingInput],
    [SchemeRoutingResult],
    ["query"]
  ),
  "runAnalysis": Func([AnalysisInput, Radius$1], [AnalysisResult], []),
  "schema": Func([], [Text], ["query"])
});
const idlFactory = ({ IDL }) => {
  const Error2 = IDL.Variant({
    "FrontendOriginsNotConfigured": IDL.Null,
    "MixedSsoSources": IDL.Record({
      "otherKeys": IDL.Vec(IDL.Text),
      "ssoKeys": IDL.Vec(IDL.Text)
    }),
    "Stale": IDL.Record({ "ageNs": IDL.Nat }),
    "MalformedCandid": IDL.Null,
    "AmbiguousAttribute": IDL.Record({
      "field": IDL.Text,
      "sources": IDL.Vec(IDL.Text)
    }),
    "NoAttributes": IDL.Null,
    "UnknownNonce": IDL.Null,
    "UntrustedSsoSource": IDL.Record({ "domain": IDL.Text }),
    "MissingField": IDL.Text,
    "FrontendOriginMismatch": IDL.Record({
      "got": IDL.Text,
      "expected": IDL.Vec(IDL.Text)
    })
  });
  const Result__12 = IDL.Variant({ "ok": IDL.Null, "err": Error2 });
  const UserRole2 = IDL.Variant({
    "admin": IDL.Null,
    "user": IDL.Null,
    "guest": IDL.Null
  });
  const ChatMessage2 = IDL.Record({
    "content": IDL.Text,
    "role": IDL.Variant({ "user": IDL.Null, "assistant": IDL.Null })
  });
  const ChatRequest2 = IDL.Record({
    "history": IDL.Vec(ChatMessage2),
    "analysisId": IDL.Nat,
    "message": IDL.Text
  });
  const ChatResponse2 = IDL.Record({ "reply": IDL.Text });
  const Provenance2 = IDL.Variant({
    "Estimated": IDL.Null,
    "UserProvided": IDL.Null,
    "Calculated": IDL.Null,
    "Observed": IDL.Null
  });
  const Confidence2 = IDL.Variant({
    "Low": IDL.Null,
    "High": IDL.Null,
    "Medium": IDL.Null
  });
  const Estimate2 = IDL.Record({
    "provenance": Provenance2,
    "value": IDL.Nat,
    "confidence": Confidence2
  });
  const RepaymentRow2 = IDL.Record({
    "emi": IDL.Nat,
    "month": IDL.Nat,
    "principal": IDL.Nat,
    "interest": IDL.Nat,
    "closingBalance": IDL.Nat,
    "openingBalance": IDL.Nat
  });
  const PrincipalInterest2 = IDL.Record({
    "totalRepayment": IDL.Nat,
    "totalInterest": IDL.Nat,
    "totalPrincipal": IDL.Nat
  });
  const Amortization2 = IDL.Record({
    "emi": Estimate2,
    "totalRepayment": Estimate2,
    "totalInterest": Estimate2,
    "schedule": IDL.Vec(RepaymentRow2),
    "principalInterest": PrincipalInterest2
  });
  const BreakEven2 = IDL.Record({
    "explanation": IDL.Text,
    "breakEvenSales": Estimate2,
    "breakEvenUnits": IDL.Opt(Estimate2),
    "assumptions": IDL.Vec(IDL.Text)
  });
  const CashRequirement2 = IDL.Record({
    "total": Estimate2,
    "projectCost": Estimate2,
    "buffer": Estimate2,
    "workingCapital": Estimate2
  });
  const OperatingCosts2 = IDL.Record({
    "rawMaterial": IDL.Nat,
    "salary": IDL.Nat,
    "other": IDL.Nat,
    "marketing": IDL.Nat,
    "rent": IDL.Nat,
    "transport": IDL.Nat,
    "electricity": IDL.Nat,
    "maintenance": IDL.Nat,
    "packaging": IDL.Nat
  });
  const WorkingCapitalInput2 = IDL.Record({
    "initialRequirement": IDL.Nat,
    "monthlyRequirement": IDL.Nat,
    "emergencyBufferPercent": IDL.Nat
  });
  const FinanceInput2 = IDL.Record({
    "operatingCosts": OperatingCosts2,
    "moratoriumMonths": IDL.Nat,
    "pricePerUnit": IDL.Nat,
    "loanRequirement": IDL.Nat,
    "ownCapital": IDL.Nat,
    "tenureMonths": IDL.Nat,
    "proposedProjectCost": IDL.Nat,
    "variableCostPerUnit": IDL.Nat,
    "interestRatePercent": IDL.Nat,
    "marginPercent": IDL.Nat,
    "workingCapital": WorkingCapitalInput2
  });
  const SchemeRule2 = IDL.Record({
    "maxProjectCost": IDL.Nat,
    "moratoriumMonths": IDL.Nat,
    "name": IDL.Text,
    "loanPercent": IDL.Nat,
    "tenureMonths": IDL.Nat,
    "beneficiaryContributionPercent": IDL.Nat,
    "interestRatePercent": IDL.Nat,
    "minProjectCost": IDL.Nat
  });
  const Moratorium2 = IDL.Record({
    "moratoriumMonths": IDL.Nat,
    "explanation": IDL.Text,
    "repaymentStartMonth": IDL.Nat,
    "interestAccruedDuringMoratorium": Estimate2
  });
  const Financing2 = IDL.Record({
    "loanAmount": Estimate2,
    "scheme": SchemeRule2,
    "feasibleProjectCost": Estimate2,
    "beneficiaryContribution": Estimate2,
    "maximumLoan": Estimate2
  });
  const WorkingCapital2 = IDL.Record({
    "initialRequirement": Estimate2,
    "emergencyBuffer": Estimate2,
    "totalRequirement": Estimate2,
    "monthlyRequirement": Estimate2
  });
  const FinancialPlan2 = IDL.Record({
    "moratorium": Moratorium2,
    "breakEven": BreakEven2,
    "financing": Financing2,
    "workingCapital": WorkingCapital2,
    "cashRequirement": CashRequirement2,
    "monthlyOperatingCost": Estimate2,
    "amortization": Amortization2
  });
  const Value2 = IDL.Variant({
    "int": IDL.Int,
    "nat": IDL.Nat,
    "float": IDL.Float64,
    "bool": IDL.Bool,
    "null": IDL.Null,
    "text": IDL.Text
  });
  const Cell2 = IDL.Record({ "value": Value2, "name": IDL.Text });
  const Result2 = IDL.Record({
    "hasMore": IDL.Bool,
    "rows": IDL.Vec(IDL.Vec(Cell2))
  });
  const Competitor2 = IDL.Record({
    "id": IDL.Nat,
    "lat": IDL.Float64,
    "lng": IDL.Float64,
    "name": IDL.Text,
    "distanceKm": IDL.Float64,
    "priceRangeAvg": IDL.Nat,
    "priceRangeMax": IDL.Nat,
    "priceRangeMin": IDL.Nat
  });
  const MapData2 = IDL.Record({
    "businessClusters": IDL.Vec(IDL.Text),
    "underservedZones": IDL.Vec(IDL.Text),
    "userLocation": IDL.Record({ "lat": IDL.Float64, "lng": IDL.Float64 }),
    "reliableDataAvailable": IDL.Bool,
    "competitors": IDL.Vec(Competitor2),
    "averageDistance": IDL.Float64,
    "nearestCompetitors": IDL.Vec(Competitor2),
    "competitorDensity": IDL.Float64
  });
  const ScoreCard2 = IDL.Record({
    "explanation": IDL.Text,
    "reasoning": IDL.Text,
    "score": IDL.Nat
  });
  const Scores2 = IDL.Record({
    "supplyGap": ScoreCard2,
    "demand": ScoreCard2,
    "competition": ScoreCard2,
    "opportunity": ScoreCard2
  });
  const RiskLevel2 = IDL.Variant({
    "Low": IDL.Null,
    "High": IDL.Null,
    "Medium": IDL.Null
  });
  const RiskCategory2 = IDL.Record({
    "why": IDL.Text,
    "whatToDo": IDL.Text,
    "level": RiskLevel2,
    "category": IDL.Text
  });
  const RiskAssessment2 = IDL.Record({ "categories": IDL.Vec(RiskCategory2) });
  const SWOT2 = IDL.Record({
    "weaknesses": IDL.Vec(IDL.Text),
    "strengths": IDL.Vec(IDL.Text),
    "threats": IDL.Vec(IDL.Text),
    "opportunities": IDL.Vec(IDL.Text)
  });
  const Pricing2 = IDL.Record({
    "packagingCost": Estimate2,
    "recommendedPriceRange": IDL.Record({ "max": IDL.Nat, "min": IDL.Nat }),
    "productionCost": Estimate2,
    "transportCost": Estimate2,
    "competitorPriceRange": IDL.Record({
      "avg": IDL.Nat,
      "max": IDL.Nat,
      "min": IDL.Nat
    }),
    "operatingCost": Estimate2,
    "estimatedMargin": Estimate2
  });
  const MarketReach2 = IDL.Record({
    "demandIndicators": IDL.Vec(IDL.Text),
    "potentialCustomerBase": Estimate2,
    "competitionLevel": IDL.Text,
    "nearbyMarkets": IDL.Vec(IDL.Text),
    "estimatedReach": Estimate2,
    "supplyIndicators": IDL.Vec(IDL.Text),
    "underservedOpportunities": IDL.Vec(IDL.Text),
    "distributionChannels": IDL.Vec(IDL.Text),
    "accessibility": IDL.Text
  });
  const AnalysisResult2 = IDL.Record({
    "map": MapData2,
    "scores": Scores2,
    "risk": RiskAssessment2,
    "swot": SWOT2,
    "pricing": Pricing2,
    "market": MarketReach2
  });
  const Radius2 = IDL.Variant({ "R5km": IDL.Null, "R10km": IDL.Null });
  const AnalysisInput2 = IDL.Record({
    "district": IDL.Text,
    "state": IDL.Text,
    "village": IDL.Text,
    "capital": IDL.Nat,
    "category": IDL.Text,
    "block": IDL.Text
  });
  const Analysis2 = IDL.Record({
    "id": IDL.Nat,
    "result": AnalysisResult2,
    "createdAt": IDL.Int,
    "radius": Radius2,
    "input": AnalysisInput2
  });
  const SchemeStatus2 = IDL.Variant({
    "UnderReview": IDL.Null,
    "Inactive": IDL.Null,
    "Active": IDL.Null
  });
  const ProjectCostRange2 = IDL.Record({ "max": IDL.Nat, "min": IDL.Nat });
  const Timestamp2 = IDL.Int;
  const Scheme2 = IDL.Record({
    "id": IDL.Nat,
    "status": SchemeStatus2,
    "documents": IDL.Vec(IDL.Text),
    "moratoriumMonths": IDL.Opt(IDL.Nat),
    "projectCostRange": ProjectCostRange2,
    "beneficiaryType": IDL.Text,
    "marginRequirement": IDL.Opt(IDL.Nat),
    "name": IDL.Text,
    "eligibility": IDL.Text,
    "tenureMonths": IDL.Opt(IDL.Nat),
    "loanPercentage": IDL.Opt(IDL.Nat),
    "interestRate": IDL.Opt(IDL.Float64),
    "lastVerifiedDate": Timestamp2,
    "officialSource": IDL.Text
  });
  const SchemeRoutingInput2 = IDL.Record({
    "projectCost": IDL.Nat,
    "businessCategory": IDL.Text,
    "beneficiaryCategory": IDL.Text,
    "contribution": IDL.Nat,
    "location": IDL.Text
  });
  const SchemeMatch2 = IDL.Record({
    "moratoriumMonths": IDL.Opt(IDL.Nat),
    "requiredDocuments": IDL.Vec(IDL.Text),
    "scheme": Scheme2,
    "loan": IDL.Opt(IDL.Nat),
    "officialVerificationNote": IDL.Text,
    "tenureMonths": IDL.Opt(IDL.Nat),
    "interestRate": IDL.Opt(IDL.Float64),
    "projectCostLimit": ProjectCostRange2,
    "contribution": IDL.Opt(IDL.Nat),
    "whyMayFit": IDL.Text
  });
  const SchemeRoutingResult2 = IDL.Record({
    "heading": IDL.Text,
    "matches": IDL.Vec(SchemeMatch2)
  });
  return IDL.Service({
    "_initialize_access_control": IDL.Func([], [], []),
    "_internet_identity_sign_in_finish": IDL.Func([], [Result__12], []),
    "_internet_identity_sign_in_start": IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    "assignCallerUserRole": IDL.Func([IDL.Principal, UserRole2], [], []),
    "chat": IDL.Func([ChatRequest2], [ChatResponse2], []),
    "computeAmortization": IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
      [Amortization2],
      ["query"]
    ),
    "computeBreakEven": IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Nat],
      [BreakEven2],
      ["query"]
    ),
    "computeCashRequirement": IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Nat],
      [CashRequirement2],
      ["query"]
    ),
    "computeFinancialPlan": IDL.Func(
      [FinanceInput2, SchemeRule2],
      [FinancialPlan2],
      ["query"]
    ),
    "computeFinancing": IDL.Func(
      [FinanceInput2, SchemeRule2],
      [Financing2],
      ["query"]
    ),
    "computeMoratorium": IDL.Func(
      [IDL.Nat, IDL.Nat, IDL.Nat],
      [Moratorium2],
      ["query"]
    ),
    "computeWorkingCapital": IDL.Func(
      [WorkingCapitalInput2],
      [WorkingCapital2],
      ["query"]
    ),
    "execute": IDL.Func([IDL.Text], [Result2], ["query"]),
    "getAnalysis": IDL.Func([IDL.Nat], [IDL.Opt(Analysis2)], ["query"]),
    "getApiDoc": IDL.Func([], [IDL.Text], ["query"]),
    "getCallerUserRole": IDL.Func([], [UserRole2], ["query"]),
    "getScheme": IDL.Func([IDL.Nat], [IDL.Opt(Scheme2)], ["query"]),
    "isCallerAdmin": IDL.Func([], [IDL.Bool], ["query"]),
    "listAnalyses": IDL.Func([], [IDL.Vec(Analysis2)], ["query"]),
    "listSchemes": IDL.Func([], [IDL.Vec(Scheme2)], ["query"]),
    "routeSchemes": IDL.Func(
      [SchemeRoutingInput2],
      [SchemeRoutingResult2],
      ["query"]
    ),
    "runAnalysis": IDL.Func([AnalysisInput2, Radius2], [AnalysisResult2], []),
    "schema": IDL.Func([], [IDL.Text], ["query"])
  });
};
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var Radius = /* @__PURE__ */ ((Radius2) => {
  Radius2["R5km"] = "R5km";
  Radius2["R10km"] = "R10km";
  return Radius2;
})(Radius || {});
var Variant_user_assistant = /* @__PURE__ */ ((Variant_user_assistant2) => {
  Variant_user_assistant2["user"] = "user";
  Variant_user_assistant2["assistant"] = "assistant";
  return Variant_user_assistant2;
})(Variant_user_assistant || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _initialize_access_control() {
    if (this.processError) {
      try {
        const result = await this.actor._initialize_access_control();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initialize_access_control();
      return result;
    }
  }
  async _internet_identity_sign_in_finish() {
    if (this.processError) {
      try {
        const result = await this.actor._internet_identity_sign_in_finish();
        return from_candid_Result__1_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._internet_identity_sign_in_finish();
      return from_candid_Result__1_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async _internet_identity_sign_in_start() {
    if (this.processError) {
      try {
        const result = await this.actor._internet_identity_sign_in_start();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._internet_identity_sign_in_start();
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n5(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n5(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async chat(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.chat(to_candid_ChatRequest_n7(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.chat(to_candid_ChatRequest_n7(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async computeAmortization(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.computeAmortization(arg0, arg1, arg2, arg3);
        return from_candid_Amortization_n13(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeAmortization(arg0, arg1, arg2, arg3);
      return from_candid_Amortization_n13(this._uploadFile, this._downloadFile, result);
    }
  }
  async computeBreakEven(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.computeBreakEven(arg0, arg1, arg2);
        return from_candid_BreakEven_n21(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeBreakEven(arg0, arg1, arg2);
      return from_candid_BreakEven_n21(this._uploadFile, this._downloadFile, result);
    }
  }
  async computeCashRequirement(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.computeCashRequirement(arg0, arg1, arg2);
        return from_candid_CashRequirement_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeCashRequirement(arg0, arg1, arg2);
      return from_candid_CashRequirement_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async computeFinancialPlan(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.computeFinancialPlan(arg0, arg1);
        return from_candid_FinancialPlan_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeFinancialPlan(arg0, arg1);
      return from_candid_FinancialPlan_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async computeFinancing(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.computeFinancing(arg0, arg1);
        return from_candid_Financing_n30(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeFinancing(arg0, arg1);
      return from_candid_Financing_n30(this._uploadFile, this._downloadFile, result);
    }
  }
  async computeMoratorium(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.computeMoratorium(arg0, arg1, arg2);
        return from_candid_Moratorium_n28(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeMoratorium(arg0, arg1, arg2);
      return from_candid_Moratorium_n28(this._uploadFile, this._downloadFile, result);
    }
  }
  async computeWorkingCapital(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.computeWorkingCapital(arg0);
        return from_candid_WorkingCapital_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.computeWorkingCapital(arg0);
      return from_candid_WorkingCapital_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async execute(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.execute(arg0);
        return from_candid_Result_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.execute(arg0);
      return from_candid_Result_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAnalysis(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getAnalysis(arg0);
        return from_candid_opt_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAnalysis(arg0);
      return from_candid_opt_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async getApiDoc() {
    if (this.processError) {
      try {
        const result = await this.actor.getApiDoc();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getApiDoc();
      return result;
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n59(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n59(this._uploadFile, this._downloadFile, result);
    }
  }
  async getScheme(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getScheme(arg0);
        return from_candid_opt_n61(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getScheme(arg0);
      return from_candid_opt_n61(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async listAnalyses() {
    if (this.processError) {
      try {
        const result = await this.actor.listAnalyses();
        return from_candid_vec_n68(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listAnalyses();
      return from_candid_vec_n68(this._uploadFile, this._downloadFile, result);
    }
  }
  async listSchemes() {
    if (this.processError) {
      try {
        const result = await this.actor.listSchemes();
        return from_candid_vec_n69(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listSchemes();
      return from_candid_vec_n69(this._uploadFile, this._downloadFile, result);
    }
  }
  async routeSchemes(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.routeSchemes(arg0);
        return from_candid_SchemeRoutingResult_n70(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.routeSchemes(arg0);
      return from_candid_SchemeRoutingResult_n70(this._uploadFile, this._downloadFile, result);
    }
  }
  async runAnalysis(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.runAnalysis(arg0, to_candid_Radius_n75(this._uploadFile, this._downloadFile, arg1));
        return from_candid_AnalysisResult_n45(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.runAnalysis(arg0, to_candid_Radius_n75(this._uploadFile, this._downloadFile, arg1));
      return from_candid_AnalysisResult_n45(this._uploadFile, this._downloadFile, result);
    }
  }
  async schema() {
    if (this.processError) {
      try {
        const result = await this.actor.schema();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.schema();
      return result;
    }
  }
}
function from_candid_Amortization_n13(_uploadFile, _downloadFile, value) {
  return from_candid_record_n14(_uploadFile, _downloadFile, value);
}
function from_candid_AnalysisResult_n45(_uploadFile, _downloadFile, value) {
  return from_candid_record_n46(_uploadFile, _downloadFile, value);
}
function from_candid_Analysis_n43(_uploadFile, _downloadFile, value) {
  return from_candid_record_n44(_uploadFile, _downloadFile, value);
}
function from_candid_BreakEven_n21(_uploadFile, _downloadFile, value) {
  return from_candid_record_n22(_uploadFile, _downloadFile, value);
}
function from_candid_CashRequirement_n24(_uploadFile, _downloadFile, value) {
  return from_candid_record_n25(_uploadFile, _downloadFile, value);
}
function from_candid_Cell_n38(_uploadFile, _downloadFile, value) {
  return from_candid_record_n39(_uploadFile, _downloadFile, value);
}
function from_candid_Confidence_n19(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function from_candid_Error_n3(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n4(_uploadFile, _downloadFile, value);
}
function from_candid_Estimate_n15(_uploadFile, _downloadFile, value) {
  return from_candid_record_n16(_uploadFile, _downloadFile, value);
}
function from_candid_FinancialPlan_n26(_uploadFile, _downloadFile, value) {
  return from_candid_record_n27(_uploadFile, _downloadFile, value);
}
function from_candid_Financing_n30(_uploadFile, _downloadFile, value) {
  return from_candid_record_n31(_uploadFile, _downloadFile, value);
}
function from_candid_MarketReach_n55(_uploadFile, _downloadFile, value) {
  return from_candid_record_n56(_uploadFile, _downloadFile, value);
}
function from_candid_Moratorium_n28(_uploadFile, _downloadFile, value) {
  return from_candid_record_n29(_uploadFile, _downloadFile, value);
}
function from_candid_Pricing_n53(_uploadFile, _downloadFile, value) {
  return from_candid_record_n54(_uploadFile, _downloadFile, value);
}
function from_candid_Provenance_n17(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n18(_uploadFile, _downloadFile, value);
}
function from_candid_Radius_n57(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n58(_uploadFile, _downloadFile, value);
}
function from_candid_Result__1_n1(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n2(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n34(_uploadFile, _downloadFile, value) {
  return from_candid_record_n35(_uploadFile, _downloadFile, value);
}
function from_candid_RiskAssessment_n47(_uploadFile, _downloadFile, value) {
  return from_candid_record_n48(_uploadFile, _downloadFile, value);
}
function from_candid_RiskCategory_n50(_uploadFile, _downloadFile, value) {
  return from_candid_record_n51(_uploadFile, _downloadFile, value);
}
function from_candid_RiskLevel_n52(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function from_candid_SchemeMatch_n73(_uploadFile, _downloadFile, value) {
  return from_candid_record_n74(_uploadFile, _downloadFile, value);
}
function from_candid_SchemeRoutingResult_n70(_uploadFile, _downloadFile, value) {
  return from_candid_record_n71(_uploadFile, _downloadFile, value);
}
function from_candid_SchemeStatus_n64(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n65(_uploadFile, _downloadFile, value);
}
function from_candid_Scheme_n62(_uploadFile, _downloadFile, value) {
  return from_candid_record_n63(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n59(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n60(_uploadFile, _downloadFile, value);
}
function from_candid_Value_n40(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n41(_uploadFile, _downloadFile, value);
}
function from_candid_WorkingCapital_n32(_uploadFile, _downloadFile, value) {
  return from_candid_record_n33(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n23(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Estimate_n15(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n42(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Analysis_n43(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n61(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Scheme_n62(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n66(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n67(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n14(_uploadFile, _downloadFile, value) {
  return {
    emi: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.emi),
    totalRepayment: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.totalRepayment),
    totalInterest: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.totalInterest),
    schedule: value.schedule,
    principalInterest: value.principalInterest
  };
}
function from_candid_record_n16(_uploadFile, _downloadFile, value) {
  return {
    provenance: from_candid_Provenance_n17(_uploadFile, _downloadFile, value.provenance),
    value: value.value,
    confidence: from_candid_Confidence_n19(_uploadFile, _downloadFile, value.confidence)
  };
}
function from_candid_record_n22(_uploadFile, _downloadFile, value) {
  return {
    explanation: value.explanation,
    breakEvenSales: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.breakEvenSales),
    breakEvenUnits: record_opt_to_undefined(from_candid_opt_n23(_uploadFile, _downloadFile, value.breakEvenUnits)),
    assumptions: value.assumptions
  };
}
function from_candid_record_n25(_uploadFile, _downloadFile, value) {
  return {
    total: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.total),
    projectCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.projectCost),
    buffer: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.buffer),
    workingCapital: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.workingCapital)
  };
}
function from_candid_record_n27(_uploadFile, _downloadFile, value) {
  return {
    moratorium: from_candid_Moratorium_n28(_uploadFile, _downloadFile, value.moratorium),
    breakEven: from_candid_BreakEven_n21(_uploadFile, _downloadFile, value.breakEven),
    financing: from_candid_Financing_n30(_uploadFile, _downloadFile, value.financing),
    workingCapital: from_candid_WorkingCapital_n32(_uploadFile, _downloadFile, value.workingCapital),
    cashRequirement: from_candid_CashRequirement_n24(_uploadFile, _downloadFile, value.cashRequirement),
    monthlyOperatingCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.monthlyOperatingCost),
    amortization: from_candid_Amortization_n13(_uploadFile, _downloadFile, value.amortization)
  };
}
function from_candid_record_n29(_uploadFile, _downloadFile, value) {
  return {
    moratoriumMonths: value.moratoriumMonths,
    explanation: value.explanation,
    repaymentStartMonth: value.repaymentStartMonth,
    interestAccruedDuringMoratorium: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.interestAccruedDuringMoratorium)
  };
}
function from_candid_record_n31(_uploadFile, _downloadFile, value) {
  return {
    loanAmount: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.loanAmount),
    scheme: value.scheme,
    feasibleProjectCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.feasibleProjectCost),
    beneficiaryContribution: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.beneficiaryContribution),
    maximumLoan: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.maximumLoan)
  };
}
function from_candid_record_n33(_uploadFile, _downloadFile, value) {
  return {
    initialRequirement: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.initialRequirement),
    emergencyBuffer: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.emergencyBuffer),
    totalRequirement: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.totalRequirement),
    monthlyRequirement: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.monthlyRequirement)
  };
}
function from_candid_record_n35(_uploadFile, _downloadFile, value) {
  return {
    hasMore: value.hasMore,
    rows: from_candid_vec_n36(_uploadFile, _downloadFile, value.rows)
  };
}
function from_candid_record_n39(_uploadFile, _downloadFile, value) {
  return {
    value: from_candid_Value_n40(_uploadFile, _downloadFile, value.value),
    name: value.name
  };
}
function from_candid_record_n44(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    result: from_candid_AnalysisResult_n45(_uploadFile, _downloadFile, value.result),
    createdAt: value.createdAt,
    radius: from_candid_Radius_n57(_uploadFile, _downloadFile, value.radius),
    input: value.input
  };
}
function from_candid_record_n46(_uploadFile, _downloadFile, value) {
  return {
    map: value.map,
    scores: value.scores,
    risk: from_candid_RiskAssessment_n47(_uploadFile, _downloadFile, value.risk),
    swot: value.swot,
    pricing: from_candid_Pricing_n53(_uploadFile, _downloadFile, value.pricing),
    market: from_candid_MarketReach_n55(_uploadFile, _downloadFile, value.market)
  };
}
function from_candid_record_n48(_uploadFile, _downloadFile, value) {
  return {
    categories: from_candid_vec_n49(_uploadFile, _downloadFile, value.categories)
  };
}
function from_candid_record_n51(_uploadFile, _downloadFile, value) {
  return {
    why: value.why,
    whatToDo: value.whatToDo,
    level: from_candid_RiskLevel_n52(_uploadFile, _downloadFile, value.level),
    category: value.category
  };
}
function from_candid_record_n54(_uploadFile, _downloadFile, value) {
  return {
    packagingCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.packagingCost),
    recommendedPriceRange: value.recommendedPriceRange,
    productionCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.productionCost),
    transportCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.transportCost),
    competitorPriceRange: value.competitorPriceRange,
    operatingCost: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.operatingCost),
    estimatedMargin: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.estimatedMargin)
  };
}
function from_candid_record_n56(_uploadFile, _downloadFile, value) {
  return {
    demandIndicators: value.demandIndicators,
    potentialCustomerBase: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.potentialCustomerBase),
    competitionLevel: value.competitionLevel,
    nearbyMarkets: value.nearbyMarkets,
    estimatedReach: from_candid_Estimate_n15(_uploadFile, _downloadFile, value.estimatedReach),
    supplyIndicators: value.supplyIndicators,
    underservedOpportunities: value.underservedOpportunities,
    distributionChannels: value.distributionChannels,
    accessibility: value.accessibility
  };
}
function from_candid_record_n63(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_SchemeStatus_n64(_uploadFile, _downloadFile, value.status),
    documents: value.documents,
    moratoriumMonths: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.moratoriumMonths)),
    projectCostRange: value.projectCostRange,
    beneficiaryType: value.beneficiaryType,
    marginRequirement: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.marginRequirement)),
    name: value.name,
    eligibility: value.eligibility,
    tenureMonths: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.tenureMonths)),
    loanPercentage: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.loanPercentage)),
    interestRate: record_opt_to_undefined(from_candid_opt_n67(_uploadFile, _downloadFile, value.interestRate)),
    lastVerifiedDate: value.lastVerifiedDate,
    officialSource: value.officialSource
  };
}
function from_candid_record_n71(_uploadFile, _downloadFile, value) {
  return {
    heading: value.heading,
    matches: from_candid_vec_n72(_uploadFile, _downloadFile, value.matches)
  };
}
function from_candid_record_n74(_uploadFile, _downloadFile, value) {
  return {
    moratoriumMonths: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.moratoriumMonths)),
    requiredDocuments: value.requiredDocuments,
    scheme: from_candid_Scheme_n62(_uploadFile, _downloadFile, value.scheme),
    loan: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.loan)),
    officialVerificationNote: value.officialVerificationNote,
    tenureMonths: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.tenureMonths)),
    interestRate: record_opt_to_undefined(from_candid_opt_n67(_uploadFile, _downloadFile, value.interestRate)),
    projectCostLimit: value.projectCostLimit,
    contribution: record_opt_to_undefined(from_candid_opt_n66(_uploadFile, _downloadFile, value.contribution)),
    whyMayFit: value.whyMayFit
  };
}
function from_candid_variant_n18(_uploadFile, _downloadFile, value) {
  return "Estimated" in value ? "Estimated" : "UserProvided" in value ? "UserProvided" : "Calculated" in value ? "Calculated" : "Observed" in value ? "Observed" : value;
}
function from_candid_variant_n2(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: from_candid_Error_n3(_uploadFile, _downloadFile, value.err)
  } : value;
}
function from_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return "Low" in value ? "Low" : "High" in value ? "High" : "Medium" in value ? "Medium" : value;
}
function from_candid_variant_n4(_uploadFile, _downloadFile, value) {
  return "FrontendOriginsNotConfigured" in value ? {
    __kind__: "FrontendOriginsNotConfigured",
    FrontendOriginsNotConfigured: value.FrontendOriginsNotConfigured
  } : "MixedSsoSources" in value ? {
    __kind__: "MixedSsoSources",
    MixedSsoSources: value.MixedSsoSources
  } : "Stale" in value ? {
    __kind__: "Stale",
    Stale: value.Stale
  } : "MalformedCandid" in value ? {
    __kind__: "MalformedCandid",
    MalformedCandid: value.MalformedCandid
  } : "AmbiguousAttribute" in value ? {
    __kind__: "AmbiguousAttribute",
    AmbiguousAttribute: value.AmbiguousAttribute
  } : "NoAttributes" in value ? {
    __kind__: "NoAttributes",
    NoAttributes: value.NoAttributes
  } : "UnknownNonce" in value ? {
    __kind__: "UnknownNonce",
    UnknownNonce: value.UnknownNonce
  } : "UntrustedSsoSource" in value ? {
    __kind__: "UntrustedSsoSource",
    UntrustedSsoSource: value.UntrustedSsoSource
  } : "MissingField" in value ? {
    __kind__: "MissingField",
    MissingField: value.MissingField
  } : "FrontendOriginMismatch" in value ? {
    __kind__: "FrontendOriginMismatch",
    FrontendOriginMismatch: value.FrontendOriginMismatch
  } : value;
}
function from_candid_variant_n41(_uploadFile, _downloadFile, value) {
  return "int" in value ? {
    __kind__: "int",
    int: value.int
  } : "nat" in value ? {
    __kind__: "nat",
    nat: value.nat
  } : "float" in value ? {
    __kind__: "float",
    float: value.float
  } : "bool" in value ? {
    __kind__: "bool",
    bool: value.bool
  } : "null" in value ? {
    __kind__: "null",
    null: value.null
  } : "text" in value ? {
    __kind__: "text",
    text: value.text
  } : value;
}
function from_candid_variant_n58(_uploadFile, _downloadFile, value) {
  return "R5km" in value ? "R5km" : "R10km" in value ? "R10km" : value;
}
function from_candid_variant_n60(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_variant_n65(_uploadFile, _downloadFile, value) {
  return "UnderReview" in value ? "UnderReview" : "Inactive" in value ? "Inactive" : "Active" in value ? "Active" : value;
}
function from_candid_vec_n36(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_vec_n37(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n37(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Cell_n38(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n49(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_RiskCategory_n50(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n68(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Analysis_n43(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n69(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Scheme_n62(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n72(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_SchemeMatch_n73(_uploadFile, _downloadFile, x));
}
function to_candid_ChatMessage_n10(_uploadFile, _downloadFile, value) {
  return to_candid_record_n11(_uploadFile, _downloadFile, value);
}
function to_candid_ChatRequest_n7(_uploadFile, _downloadFile, value) {
  return to_candid_record_n8(_uploadFile, _downloadFile, value);
}
function to_candid_Radius_n75(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n76(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n5(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n6(_uploadFile, _downloadFile, value);
}
function to_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    content: value.content,
    role: to_candid_variant_n12(_uploadFile, _downloadFile, value.role)
  };
}
function to_candid_record_n8(_uploadFile, _downloadFile, value) {
  return {
    history: to_candid_vec_n9(_uploadFile, _downloadFile, value.history),
    analysisId: value.analysisId,
    message: value.message
  };
}
function to_candid_variant_n12(_uploadFile, _downloadFile, value) {
  return value == "user" ? {
    user: null
  } : value == "assistant" ? {
    assistant: null
  } : value;
}
function to_candid_variant_n6(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
function to_candid_variant_n76(_uploadFile, _downloadFile, value) {
  return value == "R5km" ? {
    R5km: null
  } : value == "R10km" ? {
    R10km: null
  } : value;
}
function to_candid_vec_n9(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_ChatMessage_n10(_uploadFile, _downloadFile, x));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
function estimate(value) {
  return {
    value: Math.round(value),
    provenance: "Calculated",
    confidence: "High"
  };
}
function round(value) {
  return Math.round(value);
}
function monthlyRate(interestRatePercent) {
  return interestRatePercent / 100 / 12;
}
function computeEmi(principal, interestRatePercent, tenureMonths) {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  const r = monthlyRate(interestRatePercent);
  if (r === 0) return round(principal / tenureMonths);
  const factor = (1 + r) ** tenureMonths;
  return round(principal * r * factor / (factor - 1));
}
function computeAmortization(loanAmount, interestRatePercent, tenureMonths, moratoriumMonths) {
  const r = monthlyRate(interestRatePercent);
  const moratoriumInterest = round(loanAmount * r * moratoriumMonths);
  const effectivePrincipal = loanAmount + moratoriumInterest;
  const emi = computeEmi(effectivePrincipal, interestRatePercent, tenureMonths);
  const schedule = [];
  let balance = loanAmount;
  let totalInterest = 0;
  for (let m = 1; m <= moratoriumMonths; m += 1) {
    const interest = round(loanAmount * r);
    const closing = balance + interest;
    schedule.push({
      month: m,
      openingBalance: balance,
      principal: 0,
      interest,
      emi: 0,
      closingBalance: closing
    });
    balance = closing;
    totalInterest += interest;
  }
  for (let k = 1; k <= tenureMonths; k += 1) {
    const month = moratoriumMonths + k;
    const interest = round(balance * r);
    const principal = Math.min(emi - interest, balance);
    const closing = balance - principal;
    schedule.push({
      month,
      openingBalance: balance,
      principal,
      interest,
      emi: principal + interest,
      closingBalance: closing
    });
    balance = closing;
    totalInterest += interest;
  }
  const principalInterest = {
    totalPrincipal: loanAmount,
    totalInterest,
    totalRepayment: loanAmount + totalInterest
  };
  return {
    emi: estimate(emi),
    totalRepayment: estimate(principalInterest.totalRepayment),
    totalInterest: estimate(principalInterest.totalInterest),
    schedule,
    principalInterest
  };
}
function computeMoratorium(loanAmount, interestRatePercent, moratoriumMonths) {
  const r = monthlyRate(interestRatePercent);
  const interestAccrued = round(loanAmount * r * moratoriumMonths);
  return {
    moratoriumMonths,
    repaymentStartMonth: moratoriumMonths + 1,
    interestAccruedDuringMoratorium: estimate(interestAccrued),
    explanation: moratoriumMonths > 0 ? `You do not pay the loan during the first ${moratoriumMonths} month${moratoriumMonths === 1 ? "" : "s"}. Repayment starts from month ${moratoriumMonths + 1}. Interest keeps adding to your loan during this period, so the amount you repay later is a little higher.` : "There is no waiting period — repayment starts from the first month after the loan is given."
  };
}
function computeWorkingCapital(input) {
  const buffer = round(
    input.monthlyRequirement * (input.emergencyBufferPercent / 100)
  );
  const total = input.initialRequirement + input.monthlyRequirement + buffer;
  return {
    initialRequirement: estimate(input.initialRequirement),
    monthlyRequirement: estimate(input.monthlyRequirement),
    emergencyBuffer: estimate(buffer),
    totalRequirement: estimate(total)
  };
}
function computeCashRequirement(feasibleProjectCost, workingCapitalTotal, buffer) {
  const total = feasibleProjectCost + workingCapitalTotal;
  return {
    projectCost: estimate(feasibleProjectCost),
    workingCapital: estimate(workingCapitalTotal),
    buffer: estimate(buffer),
    total: estimate(total)
  };
}
function computeBreakEven(fixedCosts, variableCostPerUnit, pricePerUnit) {
  const contributionPerUnit = pricePerUnit - variableCostPerUnit;
  const units = contributionPerUnit > 0 ? fixedCosts / contributionPerUnit : 0;
  const sales = units * pricePerUnit;
  return {
    breakEvenSales: estimate(sales),
    breakEvenUnits: estimate(units),
    explanation: "Break-even is the sales level where your income just covers all your costs — you neither make a profit nor a loss. Above this, you start earning profit.",
    assumptions: [
      `Fixed costs of ${fixedCosts.toLocaleString("en-IN")} rupees per month`,
      `Variable cost of ${variableCostPerUnit.toLocaleString("en-IN")} rupees per unit`,
      `Selling price of ${pricePerUnit.toLocaleString("en-IN")} rupees per unit`
    ]
  };
}
function computeFinancing(input, rule) {
  const feasibleProjectCost = Math.min(
    input.proposedProjectCost,
    rule.maxProjectCost
  );
  const maximumLoan = round(feasibleProjectCost * (rule.loanPercent / 100));
  const loanAmount = Math.min(input.loanRequirement, maximumLoan);
  const beneficiaryContribution = round(
    feasibleProjectCost * (rule.beneficiaryContributionPercent / 100)
  );
  return {
    feasibleProjectCost: estimate(feasibleProjectCost),
    beneficiaryContribution: estimate(beneficiaryContribution),
    loanAmount: estimate(loanAmount),
    maximumLoan: estimate(maximumLoan),
    scheme: rule
  };
}
function computeFinancialPlan(input, rule) {
  const financing = computeFinancing(input, rule);
  const loanAmount = financing.loanAmount.value;
  const amortization = computeAmortization(
    loanAmount,
    input.interestRatePercent,
    input.tenureMonths,
    input.moratoriumMonths
  );
  const moratorium = computeMoratorium(
    loanAmount,
    input.interestRatePercent,
    input.moratoriumMonths
  );
  const workingCapital = computeWorkingCapital(input.workingCapital);
  const cashRequirement = computeCashRequirement(
    financing.feasibleProjectCost.value,
    workingCapital.totalRequirement.value,
    workingCapital.emergencyBuffer.value
  );
  const op = input.operatingCosts;
  const monthlyOperatingCost = op.rent + op.salary + op.rawMaterial + op.electricity + op.transport + op.packaging + op.marketing + op.maintenance + op.other;
  const breakEven = computeBreakEven(
    monthlyOperatingCost,
    input.variableCostPerUnit,
    input.pricePerUnit
  );
  return {
    financing,
    amortization,
    moratorium,
    workingCapital,
    cashRequirement,
    monthlyOperatingCost: estimate(monthlyOperatingCost),
    breakEven
  };
}
function mapConfidence(value) {
  return value === "High" ? "High" : value === "Low" ? "Low" : "Medium";
}
function mapProvenance(value) {
  switch (value) {
    case "Observed":
      return "Observed";
    case "Calculated":
      return "Calculated";
    case "UserProvided":
      return "UserProvided";
    default:
      return "Estimated";
  }
}
function mapEstimate(value) {
  return {
    value: Number(value.value),
    provenance: mapProvenance(value.provenance),
    confidence: mapConfidence(value.confidence)
  };
}
function mapCompetitor(value) {
  return {
    id: Number(value.id),
    name: value.name,
    lat: value.lat,
    lng: value.lng,
    distanceKm: value.distanceKm,
    priceRangeMin: Number(value.priceRangeMin),
    priceRangeMax: Number(value.priceRangeMax),
    priceRangeAvg: Number(value.priceRangeAvg)
  };
}
function mapMap(value) {
  return {
    userLocation: value.userLocation,
    competitors: value.competitors.map(mapCompetitor),
    competitorDensity: value.competitorDensity,
    nearestCompetitors: value.nearestCompetitors.map(mapCompetitor),
    averageDistance: value.averageDistance,
    businessClusters: value.businessClusters,
    underservedZones: value.underservedZones,
    reliableDataAvailable: value.reliableDataAvailable
  };
}
function mapScores(value) {
  const map = (s, provenance, confidence) => ({
    score: Number(s.score),
    explanation: s.explanation,
    reasoning: s.reasoning,
    provenance,
    confidence
  });
  return {
    demand: map(value.demand, "Estimated", "Medium"),
    supplyGap: map(value.supplyGap, "Calculated", "Medium"),
    competition: map(value.competition, "Observed", "Medium"),
    opportunity: map(value.opportunity, "Calculated", "Medium")
  };
}
function mapPricing(value) {
  return {
    competitorPriceRange: {
      min: Number(value.competitorPriceRange.min),
      max: Number(value.competitorPriceRange.max),
      avg: Number(value.competitorPriceRange.avg)
    },
    productionCost: mapEstimate(value.productionCost),
    transportCost: mapEstimate(value.transportCost),
    packagingCost: mapEstimate(value.packagingCost),
    operatingCost: mapEstimate(value.operatingCost),
    recommendedPriceRange: {
      min: Number(value.recommendedPriceRange.min),
      max: Number(value.recommendedPriceRange.max)
    },
    estimatedMargin: mapEstimate(value.estimatedMargin)
  };
}
function mapSwot(value) {
  return {
    strengths: value.strengths,
    weaknesses: value.weaknesses,
    opportunities: value.opportunities,
    threats: value.threats
  };
}
function mapRisk(value) {
  const categories = value.categories.map((c) => ({
    category: c.category,
    level: c.level === "low" ? "low" : c.level === "high" ? "high" : "medium",
    why: c.why,
    whatToDo: c.whatToDo
  }));
  return { categories };
}
function mapMarket(value) {
  return {
    estimatedReach: mapEstimate(value.estimatedReach),
    potentialCustomerBase: mapEstimate(value.potentialCustomerBase),
    nearbyMarkets: value.nearbyMarkets,
    distributionChannels: value.distributionChannels,
    accessibility: value.accessibility,
    underservedOpportunities: value.underservedOpportunities,
    demandIndicators: value.demandIndicators,
    supplyIndicators: value.supplyIndicators,
    competitionLevel: value.competitionLevel
  };
}
function mapResult(value) {
  return {
    market: mapMarket(value.market),
    map: mapMap(value.map),
    scores: mapScores(value.scores),
    pricing: mapPricing(value.pricing),
    swot: mapSwot(value.swot),
    risk: mapRisk(value.risk)
  };
}
function toBackendRadius(radius) {
  return radius === "5km" ? Radius.R5km : Radius.R10km;
}
function toBackendInput(input) {
  return {
    village: input.village,
    block: input.block,
    district: input.district,
    state: input.state,
    category: input.category,
    capital: BigInt(Math.round(input.capital))
  };
}
function mapProjectCostRange(value) {
  return { min: Number(value.min), max: Number(value.max) };
}
function mapSchemeRule(value) {
  return {
    name: value.name,
    minProjectCost: Number(value.minProjectCost),
    maxProjectCost: Number(value.maxProjectCost),
    loanPercent: Number(value.loanPercent),
    beneficiaryContributionPercent: Number(
      value.beneficiaryContributionPercent
    ),
    interestRatePercent: Number(value.interestRatePercent),
    tenureMonths: Number(value.tenureMonths),
    moratoriumMonths: Number(value.moratoriumMonths)
  };
}
function mapRepaymentRow(value) {
  return {
    month: Number(value.month),
    openingBalance: Number(value.openingBalance),
    principal: Number(value.principal),
    interest: Number(value.interest),
    emi: Number(value.emi),
    closingBalance: Number(value.closingBalance)
  };
}
function mapPrincipalInterest(value) {
  return {
    totalPrincipal: Number(value.totalPrincipal),
    totalInterest: Number(value.totalInterest),
    totalRepayment: Number(value.totalRepayment)
  };
}
function mapAmortization(value) {
  return {
    emi: mapEstimate(value.emi),
    totalRepayment: mapEstimate(value.totalRepayment),
    totalInterest: mapEstimate(value.totalInterest),
    schedule: value.schedule.map(mapRepaymentRow),
    principalInterest: mapPrincipalInterest(value.principalInterest)
  };
}
function mapMoratorium(value) {
  return {
    moratoriumMonths: Number(value.moratoriumMonths),
    repaymentStartMonth: Number(value.repaymentStartMonth),
    interestAccruedDuringMoratorium: mapEstimate(
      value.interestAccruedDuringMoratorium
    ),
    explanation: value.explanation
  };
}
function mapWorkingCapital(value) {
  return {
    initialRequirement: mapEstimate(value.initialRequirement),
    monthlyRequirement: mapEstimate(value.monthlyRequirement),
    emergencyBuffer: mapEstimate(value.emergencyBuffer),
    totalRequirement: mapEstimate(value.totalRequirement)
  };
}
function mapBreakEven(value) {
  return {
    breakEvenSales: mapEstimate(value.breakEvenSales),
    breakEvenUnits: value.breakEvenUnits ? mapEstimate(value.breakEvenUnits) : void 0,
    explanation: value.explanation,
    assumptions: value.assumptions
  };
}
function mapCashRequirement(value) {
  return {
    projectCost: mapEstimate(value.projectCost),
    workingCapital: mapEstimate(value.workingCapital),
    buffer: mapEstimate(value.buffer),
    total: mapEstimate(value.total)
  };
}
function mapFinancing(value) {
  return {
    feasibleProjectCost: mapEstimate(value.feasibleProjectCost),
    beneficiaryContribution: mapEstimate(value.beneficiaryContribution),
    loanAmount: mapEstimate(value.loanAmount),
    maximumLoan: mapEstimate(value.maximumLoan),
    scheme: mapSchemeRule(value.scheme)
  };
}
function mapFinancialPlan(value) {
  return {
    financing: mapFinancing(value.financing),
    amortization: mapAmortization(value.amortization),
    moratorium: mapMoratorium(value.moratorium),
    workingCapital: mapWorkingCapital(value.workingCapital),
    cashRequirement: mapCashRequirement(value.cashRequirement),
    monthlyOperatingCost: mapEstimate(value.monthlyOperatingCost),
    breakEven: mapBreakEven(value.breakEven)
  };
}
function mapSchemeStatus(value) {
  return value === "Active" ? "Active" : value === "Inactive" ? "Inactive" : "UnderReview";
}
function mapScheme(value) {
  return {
    id: Number(value.id),
    name: value.name,
    eligibility: value.eligibility,
    beneficiaryType: value.beneficiaryType,
    projectCostRange: mapProjectCostRange(value.projectCostRange),
    loanPercentage: value.loanPercentage !== void 0 ? Number(value.loanPercentage) : void 0,
    interestRate: value.interestRate,
    tenureMonths: value.tenureMonths !== void 0 ? Number(value.tenureMonths) : void 0,
    moratoriumMonths: value.moratoriumMonths !== void 0 ? Number(value.moratoriumMonths) : void 0,
    marginRequirement: value.marginRequirement !== void 0 ? Number(value.marginRequirement) : void 0,
    documents: value.documents,
    officialSource: value.officialSource,
    lastVerifiedDate: Number(value.lastVerifiedDate),
    status: mapSchemeStatus(value.status)
  };
}
function mapSchemeMatch(value) {
  return {
    scheme: mapScheme(value.scheme),
    whyMayFit: value.whyMayFit,
    projectCostLimit: mapProjectCostRange(value.projectCostLimit),
    contribution: value.contribution !== void 0 ? Number(value.contribution) : void 0,
    loan: value.loan !== void 0 ? Number(value.loan) : void 0,
    interestRate: value.interestRate,
    tenureMonths: value.tenureMonths !== void 0 ? Number(value.tenureMonths) : void 0,
    moratoriumMonths: value.moratoriumMonths !== void 0 ? Number(value.moratoriumMonths) : void 0,
    requiredDocuments: value.requiredDocuments,
    officialVerificationNote: value.officialVerificationNote
  };
}
function mapSchemeRoutingResult(value) {
  return {
    heading: value.heading,
    matches: value.matches.map(mapSchemeMatch)
  };
}
function toBackendOperatingCosts(op) {
  return {
    rent: BigInt(Math.round(op.rent)),
    salary: BigInt(Math.round(op.salary)),
    rawMaterial: BigInt(Math.round(op.rawMaterial)),
    electricity: BigInt(Math.round(op.electricity)),
    transport: BigInt(Math.round(op.transport)),
    packaging: BigInt(Math.round(op.packaging)),
    marketing: BigInt(Math.round(op.marketing)),
    maintenance: BigInt(Math.round(op.maintenance)),
    other: BigInt(Math.round(op.other))
  };
}
function toBackendWorkingCapitalInput(wc) {
  return {
    initialRequirement: BigInt(Math.round(wc.initialRequirement)),
    monthlyRequirement: BigInt(Math.round(wc.monthlyRequirement)),
    emergencyBufferPercent: BigInt(Math.round(wc.emergencyBufferPercent))
  };
}
function toBackendFinanceInput(input) {
  return {
    proposedProjectCost: BigInt(Math.round(input.proposedProjectCost)),
    ownCapital: BigInt(Math.round(input.ownCapital)),
    loanRequirement: BigInt(Math.round(input.loanRequirement)),
    tenureMonths: BigInt(Math.round(input.tenureMonths)),
    interestRatePercent: BigInt(Math.round(input.interestRatePercent)),
    marginPercent: BigInt(Math.round(input.marginPercent)),
    moratoriumMonths: BigInt(Math.round(input.moratoriumMonths)),
    operatingCosts: toBackendOperatingCosts(input.operatingCosts),
    workingCapital: toBackendWorkingCapitalInput(input.workingCapital),
    pricePerUnit: BigInt(Math.round(input.pricePerUnit)),
    variableCostPerUnit: BigInt(Math.round(input.variableCostPerUnit))
  };
}
function toBackendSchemeRule(rule) {
  return {
    name: rule.name,
    minProjectCost: BigInt(Math.round(rule.minProjectCost)),
    maxProjectCost: BigInt(Math.round(rule.maxProjectCost)),
    loanPercent: BigInt(Math.round(rule.loanPercent)),
    beneficiaryContributionPercent: BigInt(
      Math.round(rule.beneficiaryContributionPercent)
    ),
    interestRatePercent: BigInt(Math.round(rule.interestRatePercent)),
    tenureMonths: BigInt(Math.round(rule.tenureMonths)),
    moratoriumMonths: BigInt(Math.round(rule.moratoriumMonths))
  };
}
function toBackendSchemeRoutingInput(input) {
  return {
    projectCost: BigInt(Math.round(input.projectCost)),
    businessCategory: input.businessCategory,
    beneficiaryCategory: input.beneficiaryCategory,
    contribution: BigInt(Math.round(input.contribution)),
    location: input.location
  };
}
function buildGroundedDemoReply(message, analysis) {
  if (!analysis) {
    return "I can help once you run an analysis. Start a new analysis so I can answer questions about your specific market context. I never invent loan amounts, scheme eligibility, or market figures.";
  }
  const { input, result } = analysis;
  const label = input.category;
  const demand = result.scores.demand.score;
  const competition = result.scores.competition.score;
  const opportunity = result.scores.opportunity.score;
  const highRisks = result.risk.categories.filter((c) => c.level === "high").map((c) => c.category);
  const lower = message.toLowerCase();
  if (lower.includes("suitable") || lower.includes("village")) {
    return `Based on your ${label} analysis in ${input.village}, ${input.district}, ${input.state}, demand scores ${demand}/100 and the overall opportunity scores ${opportunity}/100. That suggests the business is ${opportunity >= 70 ? "reasonably suitable" : "worth a closer look"} for your village. This is a demo explanation grounded in your own analysis data — I never invent market figures.`;
  }
  if (lower.includes("competition")) {
    return `Competition scores ${competition}/100 in your ${label} analysis, which is ${competition >= 60 ? "high" : competition >= 40 ? "moderate" : "low"}. This comes from the competitor data in your report. I can't invent competitor numbers — rely on the clearly-labelled data shown in this analysis.`;
  }
  if (lower.includes("risk")) {
    const risks = highRisks.length ? highRisks.join(", ") : "no High-rated categories";
    return `Your analysis rates ${risks} as the main risk areas. To reduce risk, focus on the recommended actions in the risk section of your report. This is a demo explanation grounded in your own analysis data.`;
  }
  if (lower.includes("opportunity")) {
    return `Your overall opportunity scores ${opportunity}/100, driven by demand at ${demand}/100 and a supply gap in your area. The opportunity section of your report explains this in plain language. I never invent market values.`;
  }
  if (lower.includes("margin")) {
    return `Margin is the share of each sale you keep after covering production, transport, packaging, and operating costs. Your analysis estimates a margin for your ${label} business — see the pricing section for the exact figure. I never invent financial calculations.`;
  }
  return `I can explain this ${label} analysis in plain language. Based on your results, focus on the highest-scoring opportunity and any High-rated risks. This is a demo explanation grounded in your own analysis data — I never invent loan amounts, scheme eligibility, competitor numbers, or market values.`;
}
function useAnalysisApi() {
  const { actor, isFetching } = useActor(createActor);
  const backendAvailable = !!actor && !isFetching;
  async function runAnalysis(input, radius) {
    if (actor) {
      try {
        const result = await actor.runAnalysis(
          toBackendInput(input),
          toBackendRadius(radius)
        );
        let backendId;
        try {
          const stored = await actor.listAnalyses();
          const latest = stored.reduce(
            (max, a) => max === null || a.id > max ? a.id : max,
            null
          );
          if (latest !== null) backendId = Number(latest);
        } catch {
          backendId = void 0;
        }
        return {
          analysis: {
            id: `an-${Date.now()}`,
            backendId,
            input,
            radius,
            createdAt: Date.now(),
            result: mapResult(result)
          },
          source: "backend"
        };
      } catch {
      }
    }
    return { analysis: generateDemoAnalysis(input, radius), source: "demo" };
  }
  async function chat(request, analysis) {
    const backendId = analysis == null ? void 0 : analysis.backendId;
    if (actor && backendId !== void 0) {
      try {
        const history = request.history.map((m) => ({
          content: m.content,
          role: m.role === "user" ? Variant_user_assistant.user : Variant_user_assistant.assistant
        }));
        const response = await actor.chat({
          analysisId: BigInt(backendId),
          message: request.message,
          history
        });
        return { reply: response.reply, source: "backend" };
      } catch {
      }
    }
    return {
      reply: buildGroundedDemoReply(request.message, analysis),
      source: "demo"
    };
  }
  return { runAnalysis, chat, backendAvailable };
}
function useFinanceApi() {
  const { actor, isFetching } = useActor(createActor);
  const backendAvailable = !!actor && !isFetching;
  async function computeFinancialPlan$1(input, rule) {
    if (actor) {
      try {
        const result = await actor.computeFinancialPlan(
          toBackendFinanceInput(input),
          toBackendSchemeRule(rule)
        );
        return { data: mapFinancialPlan(result), source: "backend" };
      } catch {
      }
    }
    return {
      data: computeFinancialPlan(input, rule),
      source: "demo"
    };
  }
  async function computeFinancing$1(input, rule) {
    if (actor) {
      try {
        const result = await actor.computeFinancing(
          toBackendFinanceInput(input),
          toBackendSchemeRule(rule)
        );
        return { data: mapFinancing(result), source: "backend" };
      } catch {
      }
    }
    return { data: computeFinancing(input, rule), source: "demo" };
  }
  async function routeSchemes(input) {
    if (actor) {
      try {
        const result = await actor.routeSchemes(
          toBackendSchemeRoutingInput(input)
        );
        return { data: mapSchemeRoutingResult(result), source: "backend" };
      } catch {
      }
    }
    return {
      data: { heading: "Potentially applicable schemes", matches: [] },
      source: "demo"
    };
  }
  async function listSchemes() {
    if (actor) {
      try {
        const result = await actor.listSchemes();
        return { data: result.map(mapScheme), source: "backend" };
      } catch {
      }
    }
    return { data: [], source: "demo" };
  }
  async function getScheme(id) {
    if (actor) {
      try {
        const result = await actor.getScheme(BigInt(id));
        return { data: result ? mapScheme(result) : null, source: "backend" };
      } catch {
      }
    }
    return { data: null, source: "demo" };
  }
  return {
    computeFinancialPlan: computeFinancialPlan$1,
    computeFinancing: computeFinancing$1,
    routeSchemes,
    listSchemes,
    getScheme,
    backendAvailable
  };
}
export {
  useFinanceApi as a,
  useQuery as b,
  computeFinancialPlan as c,
  useAnalysisApi as u
};
